const cardStatus = require('../mixins/cardStatus');
const gameSt = require('../mixins/gameStatus');
const Basket = require('../helpers/Basket');
const Cards = require('../helpers/Cards');
const Party = require('../helpers/Party');
const Guess = require('../helpers/Guess');

module.exports = function(app, db) {
	app.post('/party-create', async (req, res) => {
		const user_id = req.body.user_id;

    try {
      const room_id = await Party.create(app, db);
      await Party.addPlayer(app, db, room_id, user_id, true);
      await Guess.createQuestion(app, db, room_id);
      const basket_id = await Basket.create(app, db, room_id);
      const pure_cards = await Cards.getCardShelter(app, db);
      const new_cards = pure_cards.map((card)=>{
        return {
          img_url: card.img_url,
          origin_id: card.id,
          player_id: null,
          basket_id: basket_id,
          status: cardStatus.new
        }
      });
      await Cards.createPool(app, db, new_cards);

      return res.json({
        success: true,
        room_id: room_id,
        game_master: true,
        game_action: gameSt.prepare,
      })
    }
    catch(error) {
      return res.json({
        success: false,
        error: error,
      });
    }
	});
};
