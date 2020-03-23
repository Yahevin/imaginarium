const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
	app.post('/get-question', async (req, res) => {
		let roomId = req.body.room_id;
		
		let getQuestionReq = db.format(sql.sfw, ['room__question', 'room_id', roomId]);
		db.query(getQuestionReq, function (err, results) {
			if (err) throw err;
			if (results[0].question.length > 0) {
				res.json({question: results[0].question});
			} else {
				res.json({question: ''});
			}
		});
	});
}