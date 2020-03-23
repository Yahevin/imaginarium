const sql = require('../mixins/sqlCommands');
const gameSt = require('../mixins/gameStatus');


module.exports = function(app, db) {
	app.post('/card-fake', async (req, res) => {
		let handCardId = req.body.id,
			cardId = req.body.card_id,
			roomId = req.body.room_id,
			userId = req.body.user_id,
			imgUrl = req.body.img_url,
			playersCount,
			cardsCount,
			tableCard;
		
		function addFakeCard(resolve) {
			let addFakeCardReq = db.format(sql.ii3,
				['cards_on_table', 'img_url', 'card_id', 'is_main', imgUrl, cardId, false]);
			db.query(addFakeCardReq, function (err, results) {
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
				['user__table', 'user_id', 'table_card_id', 'is_main', userId, tableCard, false]);
			db.query(noteTableCard2Req, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		
		function removeFromHand(resolve) {
			let removeFromHandReq = db.format(sql.dfw, ['cards_in_hand', 'id', handCardId]);
			db.query(removeFromHandReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		
		function getCounts(resolveMain) {
			let getPlayersCount = db.format(sql.sfw, ['room', 'id', roomId]),
				getCardsCount = db.format(sql.sfw, ['room__table', 'room_id', roomId]);
			
			new Promise(resolve => {
				db.query(getPlayersCount, function (err, results) {
					if (err) throw err;
					playersCount = results[0].player_count;
					return resolve();
				});
			}).then(() => {
				db.query(getCardsCount, function (err, results) {
					if (err) throw err;
					cardsCount = results.length;
					return resolveMain();
				});
			});
		}
		
		function iAmLast() {
			return +cardsCount === +playersCount;
		}
		
		function changeGameStatus() {
			let changeGameStatusReq = db.format(sql.usw,
				['room', 'game_action', gameSt.allCardSet, 'id', roomId]);
			db.query(changeGameStatusReq, function (err, results) {
				if (err) throw err;
				res.json({success: true});
			});
		}
		
		new Promise(resolve => {
			addFakeCard(resolve)
		}).then(() => {
			new Promise(resolve => {
				noteTableCard(resolve)
			}).then(() => {
				new Promise(resolve => {
					noteTableCard2(resolve)
				}).then(() => {
					new Promise(resolve => {
						removeFromHand(resolve)
					}).then(() => {
						new Promise(resolve => {
							getCounts(resolve);
						}).then(() => {
							if (iAmLast()) {
								changeGameStatus();
							} else {
								res.json({success: true});
							}
						})
					})
				})
			})
		});
	});
}