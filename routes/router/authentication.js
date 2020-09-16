const User = require('../helpers/User');

module.exports = function(app, db) {
  app.post('/authentication', async function(req, res) {
    const nick_name = req.body.nick_name;
    const password  = req.body.password;

    try {
      const {experience, user_id} = await User.getUser(app, db, nick_name, password);

      return res.json({
        success: true,
        user_id: user_id,
        experience: experience,
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
