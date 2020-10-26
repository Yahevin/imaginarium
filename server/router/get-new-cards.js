const Basket = require('../helpers/Basket');
const Cards = require('../helpers/Cards');
const User = require('../helpers/User');

module.exports = function (app, db) {
  app.post('/get-new-cards', async (req, res) => {
    try {
      const room_id = req.body.room_id,
            user_id = req.body.user_id;

      const player_id = await User.getPlayerId(app, db, user_id, room_id);
      const basket_id = await Basket.getSelf(app, db, room_id);
      const my_cards  = await Cards.getAllMy(app, db, player_id);
      let   new_cards = await Cards.getNew(app, db, basket_id);
      const deficit = 6 - my_cards.length;

      if (new_cards.length < deficit) {
        await Cards.mixBasket(app, db, basket_id);
        new_cards = await Cards.getNew(app, db, basket_id);
      }

      const {selected_id_list, selected_cards} = getSelected(new_cards, deficit);

      await Cards.noteTaken(app, db, player_id, selected_id_list);

      return res.json({
        success: true,
        cards: selected_cards.map((card)=>{
          return {
            id: card.id,
            img_url: card.img_url
          }
        }),
      })
    } catch (error) {

      return res.json({
        success: false,
        error: error,
      });
    }
  });
};

function getSelected(new_cards, deficit) {
  const selected_id_list = [];
  const selected_cards = [];

  for (let i=0; i < deficit; i++) {
    const index = Math.floor(new_cards.length * Math.random());
    const randomItem = new_cards[index];

    if (selected_id_list.includes(randomItem.id)) {
      i--;
    } else {
      selected_id_list.push(randomItem.id);
      selected_cards.push(randomItem);
    }
  }

  if (selected_cards.length === 0) throw ('New cards not collected');

  return {selected_cards, selected_id_list};
}
