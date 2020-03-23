const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
	app.post('/set-question', async (req, res) => {
		let roomId = req.body.room_id,
			question = req.body.question;
		
		let checkQuestionReq = db.format(sql.sfw, ['room__question', 'room_id', roomId]);
		db.query(checkQuestionReq, function (err, results) {
			if (err) throw err;
			if (results.length > 0) {
				setQuestion();
			} else {
				createQuestion();
			}
		});
		
		function createQuestion() {
			let createQuestionReq = db.format(sql.ii2, ['room__question', 'question', 'room_id', question, roomId]);
			db.query(createQuestionReq, function (err, results) {
				if (err) throw err;
				res.json({success: true});
			});
		}
		
		function setQuestion() {
			let setQuestionReq = db.format(sql.usw, ['room__question', 'question', question, 'room_id', roomId]);
			db.query(setQuestionReq, function (err, results) {
				if (err) throw err;
				res.json({success: true});
			});
		}
	});
};