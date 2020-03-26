const Hand = require('../models/Hand');

module.exports = function(app, db) {
	app.get('/get-my-cards', async (req, res) => {
		
		async function getUsersHandCardsId() {
			try {
				const results = await Hand.getUsersCardList(app, db, req.body.user_id);
				
				return results.map((item) => {
					return item.hand_card_id;
				});
			}
			catch (error) {
				console.log(error);
			}
		}
		
		const usersCardsList = await getUsersHandCardsId();
		const usersCards = await Hand.getCards(app, db, usersCardsList);
		
		res.json(usersCards);
	});
};