const Hand = require('../helpers/Hand');
const User = require('../helpers/User');

module.exports = function(app, db,) {
	app.get('/get-my-cards', async (req, res) => {
    try {
      const room_id = req.body.room_id,
            user_id = req.body.user_id;

      const player_id = await User.getPlayerId(app, db, user_id, room_id);
      const results = await Hand.getCards(app, db, player_id);

      res.json({
        success: true,
        cards: results,
      })
    } catch(error) {

      return res.json({
        success: false,
        error: error,
      });
    }


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
