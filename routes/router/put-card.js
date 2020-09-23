const Table = require('../helpers/Table');


module.exports = function (app, db) {
  app.post('/put-card', async (req, res) => {
    try {
      const card_id = req.body.card_id;
      const user_id = req.body.user_id;
      const room_id = req.body.room_id;

      const player_id = await User.getPlayerId(app, db, user_id, room_id);
      const table_card = await Table.getCard(app, db, player_id);

      if (parseInt(table_card.id) === parseInt(card_id)) {
        return res.json({
          success: false,
          error: 'You have a card on the table',
        });
      }

      await Table.putCard(app, db, card_id);

      return res.json({
        success: true
      });
    } catch (error) {

      return res.json({
        success: false,
        error: error,
      });
    }
  })
};
