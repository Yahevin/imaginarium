const sql = require('../mixins/sqlCommands');
const gameSt = require('../mixins/gameStatus');


module.exports = function(app, db) {
	app.post('/card-main', async (req, res) => {
		let handCardId = req.body.id,
			cardId = req.body.card_id,
			roomId = req.body.room_id,
			userId = req.body.user_id,
			imgUrl = req.body.img_url,
			tableCard;
		
		function addMainCard(resolve) {
			let addMainCardReq = db.format(sql.ii3,
				['cards_on_table', 'img_url', 'card_id', 'is_main', imgUrl, cardId, true]);
			db.query(addMainCardReq, function (err, results) {
				if (err) throw err;
				tableCard = results.insertId;
				return resolve();
			});
		}
		
		function noteTableCard(resolve) {
			let noteTableCardReq = db.format(sql.ii3,
				['room__table', 'room_id', 'table_card_id', 'card_id', roomId, tableCard, cardId]);
			db.query(noteTableCardReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		
		function noteTableCard2(resolve) {
			let noteTableCard2Req = db.format(sql.ii3,
				['user__table', 'user_id', 'table_card_id', 'is_main', userId, tableCard, true]);
			db.query(noteTableCard2Req, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		
		function changeGameStatus() {
			let changeGameStatusReq = db.format(sql.usw,
				['room', 'game_action', gameSt.gmCardSet, 'id', roomId]);
			db.query(changeGameStatusReq, function (err, results) {
				if (err) throw err;
				res.json({success: true});
			});
		}
		
		function removeFromHand(resolve) {
			let removeFromHandReq = db.format(sql.dfw,
				['cards_in_hand', 'id', handCardId]);
			db.query(removeFromHandReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		
		new Promise(resolve => {
			addMainCard(resolve);
		}).then(() => {
			new Promise(resolve => {
				noteTableCard(resolve);
			}).then(() => {
				new Promise(resolve => {
					noteTableCard2(resolve);
				}).then(() => {
					new Promise(resolve => {
						removeFromHand(resolve);
					}).then(() => {
						changeGameStatus();
					})
				})
			})
		});
	});
}