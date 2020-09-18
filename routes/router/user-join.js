const Party = require('../helpers/Party');
const User = require('../helpers/User');

module.exports = function (app, db) {
  app.post('/user-join', async function (req, res) {
    const room_id = req.body.room_id,
          user_id = req.body.user_id;

    try {
      const roomExist = await Party.exist(app, db, room_id);

      if (roomExist) {
        const {user_exist, player_id} = await Party.includesUser(app, db, user_id, room_id);

        if (!user_exist) {
          await Party.addPlayer(app, db, user_id, room_id, false);
        } else {
          await Party.playerJoin(app, db, player_id);
        }

        const game_action = await Party.getStatus(app, db, room_id);
        const game_master = await User.gameMaster(app, db, player_id);

        const new_count = await Party.getPlayersCount(app, db, room_id);
        await Party.countUpdate(app, db, room_id, new_count);

        return res.json({
          game_action,
          game_master,
          success: true,
        })
      } else {
        return res.json({
          success: false,
          error: 'Room do not exist',
        })
      }
    } catch (error) {
      return res.json({
        success: false,
        error: error,
      });
    }
  });
};
