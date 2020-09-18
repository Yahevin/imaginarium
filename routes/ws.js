const User = require('./helpers/User');
const Party = require('./helpers/Party');
const Cards = require('./helpers/Cards');
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
      default: {
        return;
      }
    }
  }

  sendToMyRoom(message) {
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
        if (ws.controller.user_id === active_players[0].user_id) {
          ws.send('UPDATE_ROLE');
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
};
