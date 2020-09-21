const Guess = require('../helpers/Guess');

module.exports = function (app, db) {
  app.post('/get-question', async (req, res) => {
    const room_id = req.body.room_id;

    try {
      const question = Guess.getQuestion(app, db, room_id);

      return res.json({
        success: true,
        question
      })
    } catch (error) {
      return res.json({
        success: false,
        error: error,
      });
    }
  });
}
