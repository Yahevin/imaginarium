const Guess = require('../helpers/Guess');
const Card = require('../helpers/Cards');


module.exports = function(app, db) {
	app.post('/set-question', async (req, res) => {
		const room_id = req.body.room_id;
    const card_id = req.body.card_id;
    const question = req.body.question;

    try {
      try {
        await Guess.setQuestion(app, db, room_id, question, card_id);
      } catch (e) {
        await Guess.createQuestion(app, db, room_id, question, card_id);
      }
      await Card.moveToTable(app, db, card_id);

      return res.json({
        success: true,
      })
    } catch (error) {

      return res.json({
        success: false,
        error: error
      })
    }
	});
};
