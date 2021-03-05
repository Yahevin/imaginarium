import { DB_user_room } from '@my-app/interfaces';
import { COMMANDS, GAME_ACTION, GAME_MAX_SCORE, MIN_PLAYERS_COUNT, T_COMMANDS } from '@my-app/constants';
import { Basket, Cards, Guess, Party, Player, Score, Table } from '../../queries';
import { getNewGmIndex, countRewards, findActivePlayers } from '../../utils';
import { Client } from '../../types';

export class RoomController {
  private room_id: number;

  private timer: null | NodeJS.Timeout;

  readonly players: Client[];

  private readonly wss: any;

  private readonly app: any;

  private readonly db: any;

  constructor(app: any, db: any, wss: any, client: Client, room_id: number) {
    this.app = app;
    this.db = db;
    this.wss = wss;
    this.players = [];
    this.room_id = room_id;
    this.timer = null;

    this.addPlayer(client);
  }

  addPlayer(client: Client) {
    this.players.push(client);

    this.send(COMMANDS.UPDATE_PARTY);
  }

  async maybeStartToGuess() {
    console.log('maybeStartToGuess()');
    const { app, db, room_id } = this.extract();

    try {
      const { game_action } = await Party.getRoom({ app, db, room_id });
      if (game_action !== GAME_ACTION.GM_CARD_SET) return;

      const { basket_id } = await Basket.get({ app, db, room_id });
      const table_cards = await Table.getCardsList({ app, db, basket_id });

      if (this.players.length <= table_cards.length) {
        console.log('set status! ', GAME_ACTION.ALL_CARD_SET);

        await Party.setStatus({
          app,
          db,
          room_id,
          game_action: GAME_ACTION.ALL_CARD_SET,
        });

        this.send(COMMANDS.START_GUESS);
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

      const playersIdList = this.players.map((item) => item.controller.player_id).filter((item) => !!item) as number[];
      const players_voted = await Guess.getVoteList({ app, db, players_id_list: playersIdList });
      const voted_count = players_voted.length;
      const players_count = playersIdList.length - 1;
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
      const players_list: DB_user_room[] = await Party.getPlayersList({
        app,
        db,
        room_id,
      });

      const activePlayersIdList = this.players.map((item) => item.controller.player_id);
      const activePlayersList = findActivePlayers({ players_list, activePlayersIdList });

      const marks = await Guess.getVoteList({ app, db, players_id_list: activePlayersIdList });
      const table_cards = await Table.getPlayersCards({ app, db, players_id_list: activePlayersIdList });
      const { scores, rewards, highestScore } = countRewards({ players_list: activePlayersList, table_cards, marks });

      await Score.updateLocal({ app, db, scores });

      if (highestScore >= GAME_MAX_SCORE) {
        this.send(COMMANDS.END_GAME, { rewards, scores });
      } else {
        await this.setNewRoundTimeout();

        this.send(COMMANDS.SHOW_SCORE, { rewards, scores });
      }
    } catch (error) {
      console.log(error);
    }
  }

  setNewRoundTimeout() {
    const delay = 20000;
    const ctx = this;

    this.timer = setTimeout(() => {
      ctx.newRound();
    }, delay);
  }

  async newRound() {
    console.log('newRound()');
    try {
      const { app, db, room_id } = this.extract();
      const { game_action } = await Party.getRoom({ app, db, room_id });
      if (game_action !== GAME_ACTION.ALL_GUESS_DONE) return;

      await this.changeGM();

      const { basket_id } = await Basket.get({ app, db, room_id });

      await Guess.clearGuess({ app, db, basket_id });
      await Guess.clearQuestion({ app, db, room_id });
      await Cards.moveToBasket({ app, db, basket_id });
      await Party.setStatus({ app, db, room_id, game_action: GAME_ACTION.START });

      this.send(COMMANDS.UPDATE_ALL);
    } catch (error) {
      console.log(error);
    }
  }

  async changeGM() {
    try {
      const { app, db, room_id } = this.extract();

      const playerCount = this.players.length;
      const gmPlayerIndex = this.players.findIndex((item) => {
        return item.controller.game_master;
      });

      if (playerCount < MIN_PLAYERS_COUNT) return;
      // Players count is not enough

      const newGmPlayerIndex = getNewGmIndex(gmPlayerIndex, playerCount);
      const newGmPlayerId = this.players[newGmPlayerIndex].controller.player_id;

      await Party.demoteGM({ app, db, room_id });
      await Player.setGM({ app, db, player_id: newGmPlayerId });

      this.players.forEach(({ controller, send }: Client) => {
        if (controller.player_id === newGmPlayerId) {
          send('UPDATE_ROLE');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async playerLeave(player_id: number) {
    const leaverIndex = this.players.findIndex((item) => item.controller.player_id === player_id);
    const isLeaverGm = this.players[leaverIndex].controller.game_master;

    if (isLeaverGm) {
      await this.changeGM();
    }

    this.players.splice(leaverIndex, 1);
    this.send(COMMANDS.UPDATE_PARTY);
  }

  removeNewRoundTimeout() {
    this.stopTimeout();
  }

  stopTimeout() {
    if (!this.timer) return;
    clearTimeout(this.timer);
    this.timer = null;
  }

  send(type: T_COMMANDS, payload?: any) {
    try {
      const command = JSON.stringify({ type, payload });

      this.players.forEach((client: Client) => {
        client.send(command);
      });
    } catch (error) {
      console.log(error);
    }
  }

  extract() {
    return {
      app: this.app,
      db: this.db,
      players: this.players,
      room_id: this.room_id,
    };
  }
}

export type TRoomController = typeof RoomController.prototype;
