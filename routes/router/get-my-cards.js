const Hand = require('../helpers/Hand');
const User = require('../helpers/User');

module.exports = function(app, db,) {
	app.get('/get-my-cards', async (req, res) => {
    try {
      const room_id = req.body.room_id,
            user_id = req.body.user_id;

      const player_id = await User.getPlayerId(app, db, user_id, room_id);
      const cards = await Hand.getCards(app, db, player_id);

      res.json({
        success: true,
        cards,
      })
    } catch(error) {

      return res.json({
        success: false,
        error: error,
      });
    }
	});
};
