const Table = require('../helpers/Table');
const User = require('../helpers/User');

module.exports = function (app, db) {
  app.post('/put-card', async (req, res) => {
    try {
      const { card_id } = req.body;
      const { user_id } = req.body;
      const { room_id } = req.body;

      const player_id = await User.getPlayerId(app, db, user_id, room_id);
      const already_put = await Table.alreadyPut(app, db, player_id);

      if (already_put) {
        return res.json({
          success: false,
          error: 'You have a card on the table',
        });
      }

      await Table.putCard(app, db, card_id);

      return res.json({
        success: true,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
