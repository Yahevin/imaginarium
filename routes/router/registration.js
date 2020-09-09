const User = require('../helpers/User');

module.exports = function(app, db) {
  app.post('/registration', async function(req, res) {
    console.log(req.body);

    const nick_name = req.body.nick_name;
    const password  = req.body.password;

    try {
      const user_id = await User.create(app, db, nick_name, password);

      return res.json({
        success: true,
        user_id: user_id,
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
