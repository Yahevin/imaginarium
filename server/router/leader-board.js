const Party = require('../helpers/Party');
const User = require('../helpers/User');

module.exports = function (app, db) {
  app.get('/leader-board', async (req, res) => {
    const { room_id } = req.body;

    try {
      const users_id_list = await Party.getUsersIdList(app, db, room_id);
      const users = await User.getList(app, db, users_id_list);

      return res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
