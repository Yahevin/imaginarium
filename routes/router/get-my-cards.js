const Cards = require('../helpers/Cards');
const User = require('../helpers/User');

module.exports = function(app, db,) {
	app.get('/get-my-cards', async (req, res) => {
    try {
      const room_id = req.body.room_id,
            user_id = req.body.user_id;

      const player_id = await User.getPlayerId(app, db, user_id, room_id);
      const cards = await Cards.getHand(app, db, player_id);

      res.json({
        success: true,
        cards: cards.map((card)=>{
          return {
            id: card.id,
            img_url: card.img_url
          }
        }),
      })
    } catch(error) {

      return res.json({
        success: false,
        error: error,
      });
    }
	});
};
