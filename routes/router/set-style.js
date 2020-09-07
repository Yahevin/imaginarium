const User = require('../helpers/User');


module.exports = function(app, db) {
  app.post('/set-style', async (req, res) => {
    const style   = req.body.player_style,
          user_id  = req.body.user_id,
          room_id  = req.body.room_id;

    try {
      const player_id = await User.getPlayerId(app,db, user_id, room_id);
      const style_set = await User.setStyle(app, db, style, player_id);

      return res.json (style_set);
    } catch (error) {
      return res.json ({
        success: false,
        error: error,
      });
    }
  });
};
