const Guess = require('../helpers/Guess');

module.exports = function (app, db) {
  app.post('/get-question', async (req, res) => {
    const { room_id } = req.body;

    try {
      const question = await Guess.getQuestion(app, db, room_id);

      return res.json({
        success: true,
        question,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
