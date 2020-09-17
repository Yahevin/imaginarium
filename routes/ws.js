const User = require('./helpers/User');
const Party = require('./helpers/Party');
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
          const id = parseInt(message.payload);
          this.room_id = id;

          this.player_id = await User.getPlayerId(this.app, this.db, this.user_id, id);
          this.makeUpdateParty();
        } catch (error) {
          console.log(error);
        }
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

  async terminate() {
    if (this.room_id !== null) {
      try {
        await Party.playerLeave(this.app, this.db, this.player_id);

        const new_count = await Party.getPlayersCount(this.app, this.db, this.room_id);

        await Party.countUpdate(this.app, this.db, this.room_id, new_count);

        if (new_count < 3) {
          this.makeUpdateParty();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  makeUpdateParty() {
    this.wss.clients.forEach((ws) => {
      if (ws.controller.room_id === this.room_id) {
        ws.send('UPDATE_PARTY');
      }
    })
  }

};
