const User = require('./helpers/User');
const Party = require('./helpers/Party');
const Cards = require('./helpers/Cards');
const Guess = require('./helpers/Guess');
const Table = require('./helpers/Table');
const gameStatus = require('./mixins/gameStatus');

module.exports = class SocketController {
  constructor(app, db, wss) {
    this.app = app;
    this.db = db;
    this.wss = wss;
    this.user_id = null;
    this.room_id = null;
    this.player_id = null;
  }

  async reduce(message) {
    switch (message.type) {
      case 'AUTH': {
        this.user_id = parseInt(message.payload);
        break;
      }
      case 'JOIN': {
        try {
          const room_id = parseInt(message.payload);
          this.room_id = room_id;
          this.player_id = await User.getPlayerId(this.app, this.db, this.user_id, room_id);
        } catch (error) {
          console.log(error);
          // TODO send alert to re-auth;
        }

        this.makeUpdateParty();
        break;
      }
      case 'LEAVE': {
        this.room_id = null;
        this.player_id = null;

        this.makeUpdateParty();
        break;
      }
      case 'START_GUESS': {
        this.sendToMyRoom('SET_QUESTION', message.payload);
        break;
      }
      case 'PUT_THE_FAKE': {
        this.maybeStartToGuess();
        break;
      }
      case 'MAKE_GUESS': {
        this.maybeCountResults();
        break;
      }
      default: {
        return;
      }
    }
  }

  sendToMyRoom(type, payload) {
    const message = JSON.stringify({type, payload});

    this.wss.clients.forEach((ws) => {
      if (ws.controller.room_id === this.room_id) {
        ws.send(message);
      }
    })
  }

  async terminate() {
    if (this.room_id !== null) {
      try {
        await Party.playerLeave(this.app, this.db, this.player_id);

        const new_count = await Party.getPlayersCount(this.app, this.db, this.room_id);

        await Party.countUpdate(this.app, this.db, this.room_id, new_count);
        await this.maybeStartToGuess();
        this.makeUpdateParty();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async makeUpdateParty() {
    await this.checkGameMaster();
    this.sendToMyRoom('UPDATE_PARTY');
  }

  async checkGameMaster() {
    try {
      const active_players = await Party.getActivePlayersList(this.app, this.db, this.room_id);
      if (active_players.length < 3) return;
      // Players count is enough

      const gm_player = active_players.findIndex((item) => {
        return item.game_master;
      });
      if (gm_player !== -1) return;
      // Game master is not active player
      const new_gm_player_id = active_players[0].id;

      await Party.demoteGM(this.app, this.db, this.room_id);
      await User.setGM(this.app, this.db, new_gm_player_id);

      this.wss.clients.forEach((ws) => {
        if (ws.controller.player_id === active_players[0].id) {
          ws.send('UPDATE_ROLE');
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async maybeStartToGuess() {
    try {
      const game_action = await Party.getStatus(this.app, this.db, this.room_id);
      if (game_action !== gameStatus.gmCardSet) return;

      const players_count = await Party.getPlayersCount(this.app, this.db, this.room_id);
      const table_cards = await Table.getCardsList(this.app, this.db, this.room_id);

      if (parseInt(players_count) === parseInt(table_cards.length)) {
        await Party.setStatus(this.app, this.db, this.room_id, gameStatus.allCardSet);

        this.sendToMyRoom('UPDATE_ACTION');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async maybeCountResults() {
    try {
      const users_id_list = await Party.getActivePlayersIdList(this.app, this.db, this.room_id);
      const users_voted = await Guess.getVoteList(this.app, this.db, users_id_list);
      const voted_count = users_voted.length;
      const user_count = users_id_list.length;
      const last_vote = voted_count === (user_count - 1);

      if (last_vote) {
        await Party.setStatus(this.app, this.db, this.room_id, gameStatus.allGuessDone);

        await this.countResults();
        this.sendToMyRoom('UPDATE_ACTION');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async countResults() {
    try {
      const players_list = Party.getActivePlayersList(this.app, this.db, this.room_id);
      const players_id_list = players_list.map((player) => {
        return player.id;
      });
      const marks = Guess.getVoteList(this.app, this.db, players_id_list);
      const table_cards = Table.getCardsList(this.app, this.db, players_id_list);
      const max = marks.length;

      const rewards = table_cards.map((card) => {
        let score = 0;
        marks.forEach((mark) => {
          if (card.hasOwnProperty('id') && card.id === mark.card_id) {
            score++;
          }
        });
        if (card.hasOwnProperty('is_main') && card.is_main) {
          score = score === 0 || score === max
            ? score = -3
            : score += 3;
        }
        return {
          id: card.player_id,
          score: score,
        };
      });

      rewards.forEach((reward) => {
        players_list.forEach((player) => {
          if (player.id === reward.id) {
            reward.score = +player.score + reward.score;
          }
        });
      });

      await Score.updateLocal(this.app, this.db, this.room_id, rewards);
    } catch (error) {
      console.log(error);
    }
  }
}
