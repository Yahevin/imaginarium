const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
	app.post('/table-cards', async (req, res) => {
		let roomId = req.body.room_id,
			cardIds = [],
			resp = [];
		
		function getCardsId(resolve) {
			let getCardsIdReq = db.format(sql.sfw, ['room__table', 'room_id', roomId]);
			db.query(getCardsIdReq, function (err, results) {
				if (err) throw err;
				cardIds = results.map((item) => {
					return item.table_card_id;
				});
				return resolve();
			});
		}
		
		function getCards() {
			cardIds.forEach((currentId, index) => {
				let getCardsIdReq = db.format(sql.sfw, ['cards_on_table', 'id', currentId]);
				db.query(getCardsIdReq, function (err, results) {
					if (err) throw err;
					let card = results[0],
						data = {
							img_url: card.img_url,
							card_id: card.card_id,
							id: card.id,
						};
					
					resp.push(data);
					if (index === (cardIds.length - 1)) {
						res.json(resp);
					}
				});
			})
		}
		
		new Promise(resolve => {
			getCardsId(resolve)
		}).then(() => {
			getCards()
		})
	});
};