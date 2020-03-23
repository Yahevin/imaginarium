const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
	app.post('/table-clear', async (req, res) => {
		let roomId = req.body.room_id,
			tableCards = [],
			cardsId = [],
			distribution = {};
		
		function getTableCards(resolve) {
			let getTableCardsReq = db.format(sql.sfw, ['room__table', 'room_id', roomId]);
			db.query(getTableCardsReq, function (err, results) {
				if (err) throw err;
				tableCards = results.map((item, index) => {
					if (item.hasOwnProperty('table_card_id')) {
						return item.table_card_id
					}
				});
				cardsId = results.map((item, index) => {
					if (item.hasOwnProperty('card_id')) {
						return item.card_id
					}
				});
				return resolve();
			});
		}
		
		function getDistribution(resolve) {
			let getDistributionReq = db.format(sql.sfw,
				['distribution', 'room_id', roomId]);
			db.query(getDistributionReq, function (err, results) {
				if (err) throw err;
				distribution = results[0];
				return resolve();
			});
		}
		
		function moveToBasket(resolve) {
			if (cardsId.length > 0) {
				cardsId.forEach((currentId, index) => {
					let moveToBasketReq = db.format(sql.ii2,
						['in_basket', 'distribution_id', 'card_id', distribution.id, currentId]);
					db.query(moveToBasketReq, function (err, results) {
						if (err) throw err;
						if (index >= (cardsId.length - 1)) {
							return resolve();
						}
					});
				});
			} else {
				resolve();
			}
		}
		
		function cleanTableCards() {
			if (tableCards.length > 0) {
				tableCards.forEach((currentId, index) => {
					let cleanTableCardsReq = db.format(sql.dfw, ['cards_on_table', 'id', currentId]);
					db.query(cleanTableCardsReq, function (err, results) {
						if (err) throw err;
						if (index >= (tableCards.length - 1)) {
							res.json({success: true});
						}
					});
				});
			} else {
				res.json({success: true});
			}
		}
		
		new Promise(resolve => {
			getTableCards(resolve)
		}).then(() => {
			new Promise(resolve => {
				getDistribution(resolve);
			}).then(() => {
				new Promise(resolve => {
					moveToBasket(resolve);
				}).then(() => {
					cleanTableCards()
				});
			})
		})
		
	});
};