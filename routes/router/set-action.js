const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
	app.post('/set-action', async (req, res) => {
		let roomId = req.body.room_id,
			action = req.body.action;
		
		let setActionReq = db.format(sql.usw, ['room', 'game_action', action, 'id', roomId]);
		db.query(setActionReq, function (err, results) {
			if (err) throw err;
			res.json({success: true});
		});
	});
};