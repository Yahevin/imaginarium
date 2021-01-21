const cardStatus = require('../mixins/cardStatus');
const gameSt = require('../mixins/gameStatus');
const Basket = require('../helpers/Basket');
const Cards = require('../helpers/Cards');
const Party = require('../helpers/Party');
const Guess = require('../helpers/Guess');

module.exports = function (app, db) {
  app.post('/party-create', async (req, res) => {
    const { user_id } = req.body;

    try {
      const room_id = await Party.create(app, db);
      await Party.addPlayer(app, db, user_id, room_id, true);
      await Guess.createQuestion(app, db, room_id);
      const basket_id = await Basket.create(app, db, room_id);
      const pure_cards = await Cards.getCardShelter(app, db);
      const new_cards = pure_cards.map((card) => {
        return [card.img_url, card.id, basket_id, cardStatus.new];
      });
      await Cards.createPool(app, db, new_cards);

      return res.json({
        success: true,
        room_id,
        game_master: true,
        game_action: gameSt.prepare,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
