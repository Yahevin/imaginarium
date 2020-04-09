const Distribution = require('../models/Distribution');
const Table = require('../models/Table');

module.exports = function(app, db) {
	app.post('/table-clear', async (req, res) => {
		const room_id = req.body.room_id;

    try {
      const table_items_id_list = await Table.getItemsIdList(app, db, room_id);
      const cards_id_list       = await Table.getCardsIdList(app, db, table_items_id_list);
      const distribution        = await Distribution.getSelf(app, db, room_id);

      await Distribution.moveToBasket(app, db, distribution.id, cards_id_list);
      await Table.clear(app, db, table_items_id_list);

      return res.json({
        success: true,
      });
    }
    catch(error) {
      return res.json({
        success: false,
        error: error,
      });
    }
	});
};
