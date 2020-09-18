const Guess = require('../helpers/Guess');


module.exports = function(app, db) {
	app.post('/set-question', async (req, res) => {
		const room_id = req.body.room_id;
    const card_id = req.body.card_id;
    const question = req.body.question;

    try {
      await Guess.setQuestion(app, db, room_id, question, card_id);

      return res.json({
        success: true,
      })
    } catch(firstError) {
      try {
        await Guess.createQuestion(app, db, room_id, question, card_id);

        return res.json({
          success: true,
        })
      } catch (secondError) {
        return res.json({
          success: false,
          error: [firstError, secondError]
        });
      }
    }
	});
};
