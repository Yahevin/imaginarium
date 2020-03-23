const sql = require('../mixins/sqlCommands');
const gameSt = require('../mixins/gameStatus');


module.exports = function(app, db) {
app.post('/user-join', async (req, res) => {
	let roomId = req.body.roomId,
		nickName = req.body.nickName,
		users = [],
		roomExist = false,
		userExist = false,
		newCount,
		userId;
	
	
	function getUsers(resolve) {
		let getUsersIdReq = db.format(sql.sfw, ['user__room', 'room_id', roomId]);
		db.query(getUsersIdReq, function (err, results) {
			if (err) throw err;
			if(results.length > 0) {
				results.forEach((item)=>{
					users.push(item.user_id);
				})
			}
			return resolve();
		});
	}
	
	function getPlayersCount(resolve) {
		let getPlayersCountReq = db.format(sql.sfw, ['room', 'id', roomId]);
		db.query(getPlayersCountReq, function (err, results) {
			if (err) throw err;
			if (results.length === 0) {
				res.json({success:false, err:'room_not_exist'});
			} else {
				roomExist = true;
				newCount = +results[0].player_count + 1;
			}
			return resolve();
		});
	}
	function userJoin(resolveMain) {
		new Promise(resolve => {
			checkNickName(resolve);
		}).then(()=>{
			if (userExist) {
				return resolveMain();
			} else {
				new Promise(resolve => {
					playerCreate(resolve);
				}).then(()=>{
					new Promise(resolve => {
						checkNickName(resolve);
					}).then(()=>{
						if (userExist) {
							playerCountUpdate();
							chainPlayer();
							return resolveMain();
						} else {
							res.json({success: false});
						}
					})
				})
			}
		})
	}
	function checkNickName(resolve) {
		let playerCreateReq = db.format(sql.sfw, ['users', 'nick_name', nickName]);
		db.query(playerCreateReq, function (err, results) {
			if (err) throw err;
			userExist = results.length > 0;
			if (userExist) {
				results.forEach((item)=>{
					if (users.includes(item.id)) {
						let data = {
							success: true,
							room_id: roomId,
							user_id: item.id,
							nick_name: nickName,
							player_style: item.player_style,
							game_master: item.game_master,
							game_action: gameSt.prepare,
						};
						res.json(data);
					}
				});
			}
			return resolve();
		});
	}
	function playerCreate(resolve) {
		let playerCreateReq = db.format(sql.ii3, ['users', 'nick_name','game_master','player_style', nickName, false, null]);
		db.query(playerCreateReq, function (err, results) {
			if (err) throw err;
			userId = results.insertId;
			return resolve();
		});
	}
	function playerCountUpdate() {
		let playerCountUpdateReq = db.format(sql.usw, ['room', 'player_count', newCount, 'id', roomId]);
		db.query(playerCountUpdateReq, function (err, results) {
			if (err) throw err;
		});
	}
	function chainPlayer() {
		let chainPlayerReq = db.format(sql.ii2, ['user__room', 'room_id', 'user_id', roomId, userId]);
		db.query(chainPlayerReq, function (err, results) {
			if (err) throw err;
		});
	}
	new Promise(resolve => {
		getUsers(resolve)
	}).then(()=>{
		new Promise(resolve => {
			getPlayersCount(resolve);
		}).then(()=>{
			if (roomExist) {
				new Promise(resolve => {
					userJoin(resolve)
				})
			}
		})
	})
});
};