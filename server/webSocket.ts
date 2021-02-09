// eslint-disable-next-line max-classes-per-file
import { DB_user_room, IMessage } from '@my-app/interfaces';
import { CLIENT_EVENTS, COMMANDS, GAME_ACTION, GAME_MAX_SCORE, MIN_PLAYERS_COUNT, T_COMMANDS } from '@my-app/constants';
import { Player, Party, Basket, Cards, Guess, Score, Table } from './queries';
import { findNewGM } from './utils/parts/findNewGM';
import { countRewards } from './utils/parts/countRewards';

const END_GAME = 60;

type TSocketClient = {
  room_id: number | null;
  user_id: number | null;
  player_id: number | null;
};

export class SocketController {
  private room_id: number | null;

  private user_id: number | null;

  private player_id: number | null;

  private timer: null | NodeJS.Timeout;

  private readonly wss: any;

  private readonly app: any;

  private readonly db: any;

  constructor(app: any, db: any, wss: any) {
    this.app = app;
    this.db = db;
    this.wss = wss;
    this.user_id = null;
    this.room_id = null;
    this.player_id = null;
    this.timer = null;
  }

  async reduce(message: IMessage) {
    // eslint-disable-next-line default-case
    switch (message.type) {
      case CLIENT_EVENTS.AUTH: {
        this.user_id = parseInt(message.payload);
        break;
      }
      case CLIENT_EVENTS.JOIN: {
        try {
          const { app, db, user_id } = this.extract();
          const room_id = parseInt(message.payload);
          const player = await Player.get({
            app,
            db,
            user_id,
            room_id,
            by: 'room',
          });
          this.room_id = room_id;
          this.player_id = player.id;

          this.makeUpdateParty();
        } catch (error) {
          console.log(error);
          // TODO send alert to re-auth;
        }
        break;
      }
      case CLIENT_EVENTS.LEAVE: {
        this.room_id = null;
        this.player_id = null;

        this.makeUpdateParty();
        break;
      }
      case CLIENT_EVENTS.PUT_THE_ORIGIN: {
        this.sendToMyRoom(COMMANDS.UPDATE_QUESTION, message.payload);
        break;
      }
      case CLIENT_EVENTS.PUT_THE_FAKE: {
        this.maybeStartToGuess();
        break;
      }
      case CLIENT_EVENTS.MAKE_GUESS: {
        this.maybeCountResults();
        break;
      }
      case CLIENT_EVENTS.START_NEW_ROUND: {
        this.newRound();
        break;
      }
    }
  }

  sendToMyRoom(type: T_COMMANDS, payload?: any) {
    try {
      const command = JSON.stringify({ type, payload });

      this.wss.clients.forEach((ws: { controller: TSocketClient; send: (arg: string) => void }) => {
        if (ws.controller.room_id === this.room_id) {
          ws.send(command);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async terminate() {
    if (this.room_id !== null) {
      try {
        const { app, db, player_id } = this.extract();
        await Party.playerLeave({ app, db, player_id });

        await this.maybeStartToGuess();
        await this.maybeCountResults();
        await this.makeUpdateParty();
        if (this.timer !== null) {
          this.newRound();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async makeUpdateParty() {
    await this.checkGameMaster();
    this.sendToMyRoom(COMMANDS.UPDATE_PARTY);
  }

  async checkGameMaster() {
    console.log('checkGameMaster()');
    try {
      const { app, db, room_id } = this.extract();

      const active_players: DB_user_room[] = await Party.getActivePlayersList({
        app,
        db,
        room_id,
      });
      if (active_players.length < MIN_PLAYERS_COUNT) return;
      // Players count is enough

      const gm_player = active_players.findIndex((item) => {
        return item.game_master;
      });
      if (gm_player !== -1) return;
      // Game master is not active player

      const new_gm_player_id = active_players[0].id;

      await Party.demoteGM({ app: this.app, db: this.db, room_id: this.room_id ?? -1 });
      await Player.setGM({ app: this.app, db: this.db, player_id: new_gm_player_id });

      this.wss.clients.forEach(({ controller, send }: { controller: TSocketClient; send: (arg: string) => void }) => {
        if (controller.player_id === active_players[0].id) {
          send('UPDATE_ROLE');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async maybeStartToGuess() {
    console.log('maybeStartToGuess()');
    const { app, db, room_id } = this.extract();

    try {
      const { game_action } = await Party.getRoom({ app, db, room_id });
      if (game_action !== GAME_ACTION.GM_CARD_SET) return;

      const players = await Party.getActivePlayersList({ app, db, room_id });
      const { basket_id } = await Basket.get({ app, db, room_id });
      const table_cards = await Table.getCardsList({ app, db, basket_id });

      if (players.length <= table_cards.length) {
        console.log('set status! ', GAME_ACTION.ALL_CARD_SET);

        await Party.setStatus({
          app,
          db,
          room_id,
          game_action: GAME_ACTION.ALL_CARD_SET,
        });

        this.sendToMyRoom(COMMANDS.START_GUESS);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async maybeCountResults() {
    console.log('maybeCountResults()');
    const { app, db, room_id } = this.extract();
    try {
      const { game_action } = await Party.getRoom({ app, db, room_id });
      if (game_action !== GAME_ACTION.ALL_CARD_SET) return;

      const players_id_list = await Party.getActivePlayersIdList({
        app,
        db,
        room_id,
      });
      const players_voted = await Guess.getVoteList({ app, db, players_id_list });
      const voted_count = players_voted.length;
      const players_count = players_id_list.length - 1;
      const last_vote = voted_count >= players_count;

      if (last_vote) {
        await Party.setStatus({
          app,
          db,
          room_id,
          game_action: GAME_ACTION.ALL_GUESS_DONE,
        });
        console.log('set status! ', GAME_ACTION.ALL_GUESS_DONE);
        await this.countResults();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async countResults() {
    console.log('countResults');
    const { app, db, room_id } = this.extract();
    try {
      const players_list: DB_user_room[] = await Party.getActivePlayersList({
        app,
        db,
        room_id,
      });
      const players_id_list = players_list.map((player) => {
        return player.id;
      });
      const marks = await Guess.getVoteList({ app, db, players_id_list });
      const table_cards = await Table.getPlayersCards({ app, db, players_id_list });
      const { scores, rewards, highestScore } = countRewards({ players_list, table_cards, marks });

      await Score.updateLocal({ app, db, scores });

      if (highestScore >= GAME_MAX_SCORE) {
        this.sendToMyRoom(COMMANDS.END_GAME, { rewards, scores });
      } else {
        await this.SetNewRoundTimeout();

        this.sendToMyRoom(COMMANDS.SHOW_SCORE, { rewards, scores });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async newRound() {
    console.log('newRound()');
    try {
      const { app, db, room_id } = this.extract();

      if (this.timer !== null) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      const { game_action } = await Party.getRoom({ app, db, room_id });
      if (game_action !== GAME_ACTION.ALL_GUESS_DONE) return;

      await this.changeGM();

      const { basket_id } = await Basket.get({ app, db, room_id });

      await Guess.clearGuess({ app, db, basket_id });
      await Guess.clearQuestion({ app, db, room_id });
      await Cards.moveToBasket({ app, db, basket_id });
      await Party.setStatus({ app, db, room_id, game_action: GAME_ACTION.START });

      this.sendToMyRoom(COMMANDS.UPDATE_ALL);
    } catch (error) {
      console.log(error);
    }
  }

  async changeGM() {
    try {
      const { app, db, room_id } = this.extract();

      const players_id_list: number[] = await Party.getActivePlayersIdList({
        app,
        db,
        room_id,
      });
      const gm_id: number = await Player.findGM({ app: this.app, db: this.db, room_id: this.room_id ?? -1 });
      const new_gm_id: number = findNewGM(players_id_list, gm_id);

      await Player.demoteGM({ app: this.app, db: this.db, player_id: gm_id });
      await Player.setGM({ app: this.app, db: this.db, player_id: new_gm_id });
    } catch (error) {
      console.log(error);
    }
  }

  async SetNewRoundTimeout() {
    const oneMinute = 60000;
    const callback = this.newRound.bind(this);

    this.timer = setTimeout(callback, oneMinute);
  }

  extract() {
    return {
      app: this.app,
      db: this.db,
      room_id: this.room_id as number,
      user_id: this.user_id as number,
      player_id: this.player_id as number,
    };
  }
}
