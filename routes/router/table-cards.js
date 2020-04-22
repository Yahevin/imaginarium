const Table = require('../models/Table');


module.exports = function(app, db) {
	app.get('/table-cards', async (req, res) => {
		const room_id = req.body.room_id;

    try {
      const items_id_list = await Table.getItemsIdList(app, db, room_id);
      const cards         = await Table.getCards(app, db, items_id_list);

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
