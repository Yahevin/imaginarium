const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
app.post('/get-my-cards', async (req, res) => {
	let userId = req.body.user_id,
		handCardIds = [],
		resp = [];
	
	function getHandCards(resolve) {
		let getHandCardsReq = db.format(sql.sfw, ['user__hand', 'user_id', userId]);
		
		db.query(getHandCardsReq, function(err, results) {
			if (err) throw err;
			results.forEach((item)=>{
				handCardIds.push(item.hand_card_id);
			});
			
			return resolve();
		})
	}
	function getMyCards() {
		if (handCardIds.length === 0) {
			res.json([]);
		} else {
			handCardIds.forEach((currentId, index) => {
				let getMyCardsReq = db.format(sql.sfw, ['cards_in_hand', 'id', currentId]);
				
				db.query(getMyCardsReq, function (err, results) {
					if (err) throw err;
					results.forEach((item) => {
						resp.push(item);
					});
					if (index >= handCardIds.length - 1) {
						res.json(resp);
					}
				});
			})
		}
	}
	
	new Promise(resolve => {
		getHandCards(resolve);
	}).then(()=>{
		getMyCards();
	})
});
};