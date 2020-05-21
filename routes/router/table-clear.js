const Distribution = require('../helpers/Distribution');
const Table = require('../helpers/Table');

module.exports = function(app, db) {
	app.post('/table-clear', async (req, res) => {
		const room_id = req.body.room_id;

    try {
      const basket_id       = await Distribution.getSelf(app, db, room_id);
      const table_is_clear  = await Table.clear(app, db, room_id, basket_id);

      return res.json({
        success: table_is_clear,
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
