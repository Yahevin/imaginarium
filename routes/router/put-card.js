const Table = require('../helpers/Table');


module.exports = function (app, db) {
  app.post('/put-card', async (req, res) => {
    try {
      const card_id = req.body.card_id;

      await Table.putCard(app, db, card_id);

      res.json({
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
