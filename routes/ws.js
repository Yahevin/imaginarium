const User = require('./helpers/User');
const Party = require('./helpers/Party');

module.exports = class SocketController {
  constructor(app, db) {
    this.app = app;
    this.db = db;
    this.user_id = null;
    this.room_id = null;
    this.player_id = null;
  }

  async reduce(message) {
    switch (message.type) {
      case 'AUTH': {
        this.user_id = message.user_id;
        break;
      }
      case 'JOIN': {
        this.room_id = message.room_id;
        this.player_id = await User.getPlayerId(this.app, this.db, this.user_id, message.room_id);
        break;
      }
      case 'LEAVE': {
        this.room_id = null;
        this.player_id = null;
        break;
      }
      default: {
        return;
      }
    }
  }

  async terminate() {
    if (this.room_id !== null) {
      await Party.playerLeave(this.app, this.db, this.player_id);

      const new_count = await Party.getPlayersCount(this.app, this.db, this.room_id);

      await Party.countUpdate(this.app, this.db, this.room_id, new_count);
    }
  }
};
