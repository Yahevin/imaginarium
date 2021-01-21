const User = require('../helpers/User');

module.exports = (app, db) => {
  app.post('/registration', async (req, res) => {
    const { nick_name } = req.body;
    const { password } = req.body;

    try {
      const user_id = await User.create(app, db, nick_name, password);

      return res.json({
        success: true,
        user_id,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
