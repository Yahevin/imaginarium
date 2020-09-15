const Party = require('../helpers/Party');

module.exports = function (app, db) {
  app.post('/user-join', async function (req, res) {
    const room_id = req.body.room_id,
          user_id = req.body.user_id;

    try {
      const roomExist = await Party.exist(app, db, room_id);

      if (roomExist) {
        const newCount = await Party.getPlayersCount(app, db, room_id) + 1;
        const userExist = await Party.includesUser(app, db, room_id, user_id);
        const game_action = await Party.getStatus(app, db, room_id);

        return res.json({
          success: true,
          userExist
        });


        if (!userExist) {
          await Party.addPlayer(app, db, room_id, user_id, false);
        }
        await Party.countUpdate(app, db, room_id, newCount);

        return res.json({
          game_action,
          success: true,
        })
      } else {
        return res.json({
          success: false,
          error: 'Room not exist',
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
