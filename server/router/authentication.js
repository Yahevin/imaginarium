const User = require('../helpers/User');

module.exports = function (app, db) {
  app.post('/authentication', async function (req, res) {
    const { nick_name } = req.body;
    const { password } = req.body;

    try {
      const { experience, id } = await User.getUser(app, db, nick_name, password);

      return res.json({
        success: true,
        user_id: id,
        experience,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
