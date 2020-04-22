const User = require('../models/User');


module.exports = function(app, db) {
  app.post('/set-style', async (req, res) => {
    const style   = req.body.player_style,
          user_id  = req.body.user_id;

    try {
      await User.setStyle(app, db, style, user_id);

      return res.json ({
        success: true,
      });
    } catch (error) {
      return res.json ({
        success: false,
        error: error,
      });
    }
  });
};
