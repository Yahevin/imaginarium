const Guess = require('../models/Guess');

module.exports = function(app, db) {
  app.post ('/get-question', async (req, res) => {
    const room_id = req.body.room_id;

    try {
      const question = Guess.getQuestion (app, db, room_id);

      if (question.exist) {
        res.json ({
          success: true,
          question: question.data
        })
      } else {
        res.json ({
          success: false
        })
      }
    } catch (error) {
      return res.json ({
        success: false,
        error: error,
      });
    }
  });
}
