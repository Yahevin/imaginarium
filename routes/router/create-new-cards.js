const sql = require('../mixins/sqlCommands');

const Hand = require('../helpers/Hand');
const Party = require('../helpers/Party');
const Basket = require('../helpers/Basket');
const NewCards = require('../helpers/NewCards');
const Distribution = require('../helpers/Distribution');

module.exports = function(app, db) {
	app.post('/create-new-cards', async (req, res) => {
	  try {
      const room_id = req.body.room_id;
      const cards_count = req.body.cards_count;

      const users_id_list = await Party.getUsersIdList (app, db, room_id);
      const players_count = await Party.getPlayersCount (app, db, room_id);
      const hand_id_list = await Hand.getSortedByRoom (app, db, room_id);
      const hand_cards = await Hand.getCards (app, db, hand_id_list);
      const basket_id = await Basket.getSelf (app, db, room_id);
      const shelter_cards = await Distribution.getCardShelter (app, db);
      const basket_cards = await Basket.getCards (app, db, distribution_id);

      let basket_cards_id_list = basket_cards.map ((item) => {
        return item.card_id;
      });
      const shelter_cards_id_list = shelter_cards.map ((item) => {
        return item.id;
      });
      const hand_cards_id_list = hand_cards.map ((item) => {
        return item.card_id;
      });

      function basketIsFull () {
        return (shelter_cards_id_list.length
          - hand_cards_id_list.length
          - basket_cards_id_list.length
          - players_count * cards_count) < 0;
      }

      function getRandomCards () {
        let pool = shelter_cards_id_list,
          less = hand_cards_id_list.concat (basket_cards_id_list),
          deletable;

        less.forEach ((id) => {
          deletable = pool.indexOf (id);
          pool.splice (deletable, 1);
        });

        let j, temp;
        for (let i = pool.length - 1; i > 0; i--) {
          j = Math.floor (Math.random () * (i + 1));
          temp = pool[j];
          pool[j] = pool[i];
          pool[i] = temp;
        }

        return pool
      }

      async function resetBasket () {
        const basketClear = await Basket.clear (app, db, basket_id);
        const basketReset = await Basket.create (app, db, room_id);

        if (basketClear && basketReset) {
          basket_cards_id_list = [];
        } else {
          res.json ({success: false, err: 'basket not cleared'});
        }
      }

      if (basketIsFull ()) await resetBasket ();

      const card_id_pool = getRandomCards ();
      const card_pool = shelter_cards.filter ((item) => {
        return card_id_pool.includes (item.id);
      });
      const cards_are_set = await NewCards.setCards (app, db, room_id, users_id_list, card_pool, cards_count);

      res.json ({success: cards_are_set});
    } catch (error) {
      res.json ({success: false, error: error});
    }
	})
};