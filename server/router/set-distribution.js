const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
	app.post('/set-distribution', async (req, res) => {
		let roomId = req.body.room_id,
			setDistributionReq = db.format(sql.ii1,
				['distribution', 'room_id', roomId]);
		
		db.query(setDistributionReq, function (err, results) {
			if (err) throw err;
			res.json({success: true});
		});
	});
}