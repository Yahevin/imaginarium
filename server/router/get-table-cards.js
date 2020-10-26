const Table = require('../helpers/Table');
const Basket = require('../helpers/Basket');


module.exports = function(app, db) {
	app.post('/get-table-cards', async (req, res) => {
		const room_id = req.body.room_id;

    try {
      const basket_id = await Basket.getSelf(app, db, room_id);
      const cards = await Table.getCardsList(app, db, basket_id);

      return res.json ({
        success: true,
        cards: cards.map((card)=>{
          return {
            id: card.id,
            img_url: card.img_url
          }
        })
      });
    } catch (error) {
      return res.json ({
        success: false,
        error: error,
      });
    }
	});
};
