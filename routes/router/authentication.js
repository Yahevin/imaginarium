const User = require('../helpers/User');

module.exports = function(app, db) {
  app.post('/authentication', async function(req, res) {
    const nick_name = req.body.nick_name;
    const password  = req.body.password;

    try {
      const {score, user_id} = await User.getId(app, db, nick_name, password);

      return res.json({
        success: true,
        user_id: user_id,
        score: score,
      })
    }
    catch(error) {
      return res.json({
        success: false,
        error: error,
      });
    }
  });
};
