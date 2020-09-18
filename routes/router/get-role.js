const User = require('../helpers/User');

module.exports = function(app, db) {
  app.post ('/get-role', async (req, res) => {
    const room_id = req.body.room_id;
    const user_id = req.body.user_id;

    try {
      const player_id = await User.getPlayerId(app, db, user_id, room_id);
      const game_master = await User.gameMaster(app, db, player_id);

      return res.json({
        success: true,
        game_master
      })
    } catch (error) {
      return res.json ({
        success: false,
        error: error,
      });
    }
  });
};
