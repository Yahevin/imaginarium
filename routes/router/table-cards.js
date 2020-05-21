const Table = require('../helpers/Table');


module.exports = function(app, db) {
	app.get('/table-cards', async (req, res) => {
		const room_id = req.body.room_id;

    try {
      const cards = await Table.getCards(app, db, room_id);

      return res.json ({
        success: true,
        data: cards
      });
    } catch (error) {
      return res.json ({
        success: false,
        error: error,
      });
    }
	});
};
