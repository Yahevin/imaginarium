const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
app.post('/get-marks', async (req, res) => {
	let roomId = req.body.room_id,
		userIds = [],
		resp = [];
	
	function getUsersId(resolve) {
		let getCardsIdReq = db.format(sql.sfw, ['user__room', 'room_id', roomId]);
		db.query(getCardsIdReq, function (err, results) {
			if (err) throw err;
			userIds = results.map((item)=>{
				return item.user_id;
			});
			return resolve();
		});
	}
	function getMarks() {
		userIds.forEach((currentId, index)=>{
			let getMarksReq = db.format(sql.sfw, ['user__guess', 'user_id', currentId]);
			db.query(getMarksReq, function (err, results) {
				if (err) throw err;
				if (results.length > 0) {
					resp.push(results[0]);
				}
				if(index >= (userIds.length - 1)) {
					res.json(resp);
				}
			});
		});
	}
	
	new Promise(resolve => {
		getUsersId(resolve)
	}).then(()=>{
		getMarks()
	});
	
	
});
};