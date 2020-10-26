const Basket = require('../helpers/Basket');
const Table = require('../helpers/Table');
const Guess = require('../helpers/Guess');
const User = require('../helpers/User');


module.exports = function (app, db) {
  app.post('/card-guess', async (req, res) => {
    const user_id = req.body.user_id;
    const room_id = req.body.room_id;
    const card_id = req.body.card_id;

    try {
      const player_id = await User.getPlayerId(app, db, user_id, room_id);
      const table_card = await Table.getCard(app, db, player_id);
      const basket_id = await Basket.getSelf(app, db, room_id);

      if (parseInt(table_card.id) === parseInt(card_id)) {
        return res.json({
          error: 'That`s your card',
          success: false
        });
      }

      const already_guess = await Guess.alReady(app, db, player_id);

      if (already_guess) {
        return res.json({
          error: 'You`ve been voted',
          success: false
        })
      }

      await Guess.make(app, db, player_id, card_id, basket_id);

      return res.json({
        success: true
      });
    } catch (error) {
      return res.json({
        success: false,
        error: error,
      });
    }
  });
};
