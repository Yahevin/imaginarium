const sql = require('../mixins/sqlCommands');
const gameSt = require('../mixins/gameStatus');


module.exports = function(app, db) {
	app.post('/party-create', async (req, res) => {
		
		let nickName = req.body.nickName,
			userId,
			roomId;
		
		function roomCreate(resolve) {
			let roomCreateReq = db.format(sql.ii2, ["room", "game_action",'player_count', gameSt.prepare, 1]);
			db.query(roomCreateReq, function (err, results) {
				if (err) throw err;
				roomId = results.insertId;
				return resolve();
			});
		}
		function playerCreate(resolve) {
			let playerCreateReq = db.format(sql.ii3, ['users', 'nick_name', 'game_master','player_style', nickName, true, null]);
			db.query(playerCreateReq, function (err, results) {
				if (err) throw err;
				userId = results.insertId;
				return resolve();
			});
		}
		function chainPlayer() {
			let chainPlayerReq = db.format(sql.ii2, ['user__room', 'room_id', 'user_id', roomId, userId]);
			db.query(chainPlayerReq, function (err, results) {
				if (err) throw err;
				res.json({
					room_id: roomId,
					user_id: userId,
					nick_name: nickName,
					player_style: null,
					game_master: true,
					game_action: gameSt.prepare,
				});
			});
		}
		function setQuestionField(resolve) {
			let setQuestonFieldReq = db.format(sql.ii2, ["room__question", 'room_id','question', roomId, '']);
			db.query(setQuestonFieldReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		
		new Promise(resolve => {
			roomCreate(resolve);
		}).then(() => {
			new Promise(resolve => {
				playerCreate(resolve);
			}).then(() => {
				new Promise(resolve => {
					setQuestionField(resolve);
				}).then(()=>{
					chainPlayer();
				})
			})
		})
	});
};
