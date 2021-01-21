const Guess = require('../helpers/Guess');
const Party = require('../helpers/Party');
const Table = require('../helpers/Table');
const gameStatus = require('../mixins/gameStatus');

module.exports = function (app, db) {
  app.post('/set-question', async (req, res) => {
    const { room_id } = req.body;
    const { card_id } = req.body;
    const { question } = req.body;

    try {
      try {
        await Guess.setQuestion(app, db, room_id, question, card_id);
      } catch (e) {
        await Guess.createQuestion(app, db, room_id, question, card_id);
      }
      await Table.putCard(app, db, card_id, true);
      await Party.setStatus(app, db, room_id, gameStatus.gmCardSet);

      return res.json({
        success: true,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
