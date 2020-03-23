const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
	app.post('/create-new-cards', async (req, res) => {
		let roomId = req.body.room_id,
			cardsCount = req.body.cards_count,
			playersCount,
			distributionId,
			handCards = [],
			inBasketCards = [],
			cardsShelter = [];
		
		function getPlayersCount(resolve) {
			let getPlayersCountReq = db.format(sql.sfw, ['room', 'id', roomId]);
			db.query(getPlayersCountReq, function (err, results) {
				if (err) throw err;
				playersCount = results[0].player_count;
				return resolve();
			});
		}
		
		function getHandCards(resolveMain) {
			let handCardsId = [];
			
			new Promise(resolve => {
				let getHandCardsIdReq = db.format(sql.sfw, ['room__hand', 'room_id', roomId]);
				db.query(getHandCardsIdReq, function (err, results) {
					if (err) throw err;
					results.forEach((item) => {
						handCardsId.push(item.hand_card_id);
					});
					return resolve();
				});
			}).then(() => {
				if (handCardsId.length > 0) {
					handCardsId.forEach((currentId, index) => {
						let getHandCardsReq = db.format(sql.sfw, ['cards_in_hand', 'id', currentId]);
						db.query(getHandCardsReq, function (err, results) {
							if (err) throw err;
							results.forEach((item) => {
								handCards.push(item.card_id);
							});
							if (index >= (handCardsId.length - 1)) {
								return resolveMain();
							}
						});
					})
				} else {
					return resolveMain();
				}
			});
		}
		
		function getBasketCards(resolveMain) {
			new Promise(resolve => {
				let distributionReq = db.format(sql.sfw, ['distribution', 'room_id', roomId]);
				db.query(distributionReq, function (err, results) {
					if (err) throw err;
					distributionId = results[0].id;
					return resolve();
				});
			}).then(() => {
				let getBasketCardsReq = db.format(sql.sfw, ['in_basket', 'distribution_id', distributionId]);
				db.query(getBasketCardsReq, function (err, results) {
					if (err) throw err;
					results.forEach((item) => {
						inBasketCards.push(item.card_id);
					});
					return resolveMain();
				});
			});
		}
		
		function getCardsShelter(resolve) {
			let getCardsShelterReq = db.format(sql.sf, ['cards']);
			db.query(getCardsShelterReq, function (err, results) {
				if (err) throw err;
				results.forEach((item) => {
					cardsShelter.push(item.id);
				});
				return resolve();
			});
		}
		
		function basketIsFull() {
			let diff = cardsShelter.length - handCards.length - inBasketCards.length - playersCount * cardsCount;
			return diff < 0;
		}
		
		function clearBasket(resolveMain) {
			inBasketCards = [];
			new Promise(resolve => {
				let clearReq = db.format(sql.dfw, ['distribution', 'id', distributionId]);
				db.query(clearReq, function (err, results) {
					if (err) throw err;
					return resolve();
				});
			}).then(() => {
				let clearReq = db.format(sql.ii1, ['distribution', 'room_id', roomId]);
				db.query(clearReq, function (err, results) {
					if (err) throw err;
					return resolveMain();
				});
			});
		}
		
		function getRandomCards(resolve) {
			let less = handCards.concat(inBasketCards),
				deletable;
			
			less.forEach((id) => {
				deletable = cardsShelter.indexOf(id);
				cardsShelter.splice(deletable, 1);
			});
			
			let j, temp;
			for (let i = cardsShelter.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				temp = cardsShelter[j];
				cardsShelter[j] = cardsShelter[i];
				cardsShelter[i] = temp;
			}
			return resolve();
		}
		
		function setCards() {
			let users = [];
			
			new Promise(resolve => {
				let getUsersReq = db.format(sql.sfw, ['user__room', 'room_id', roomId]);
				db.query(getUsersReq, function (err, results) {
					if (err) throw err;
					results.forEach((user) => {
						users.push(user.user_id);
					});
					return resolve();
				});
			}).then(() => {
				users.forEach((user, index) => {
					for (let i = 0; i < cardsCount; i++) {
						let setReq = db.format(sql.ii2, ['new_cards', 'card_id', 'user_id', cardsShelter[i], user]);
						db.query(setReq, function (err, results) {
							if (err) throw err;
						});
					}
					cardsShelter.splice(0, cardsCount);
					if (index >= (users.length - 1)) {
						res.json({success: true});
					}
				});
			});
		}
		
		new Promise(resolve => {
			getPlayersCount(resolve)
		}).then(() => {
			new Promise(resolve => {
				getHandCards(resolve)
			}).then(() => {
				new Promise(resolve => {
					getBasketCards(resolve)
				}).then(() => {
					new Promise(resolve => {
						getCardsShelter(resolve)
					}).then(() => {
						if (basketIsFull()) {
							new Promise(resolve => {
								clearBasket(resolve)
							}).then(() => {
								new Promise(resolve => {
									getRandomCards(resolve);
								}).then(() => {
									setCards();
								})
							})
						} else {
							new Promise(resolve => {
								getRandomCards(resolve);
							}).then(() => {
								setCards();
							})
						}
					})
				})
			})
		})
	});
}