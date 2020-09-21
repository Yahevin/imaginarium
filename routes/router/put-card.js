const User = require('../helpers/User');
const Game = require('../helpers/Game');
const Card = require('../helpers/Cards');
const Table = require('../helpers/Table');
const Party = require('../helpers/Party');
const gameSt = require('../mixins/gameStatus');


module.exports = function (app, db) {
  app.post('/put-card', async (req, res) => {
    try {
      const card_id = req.body.card_id;
      const room_id = req.body.room_id;

      await Table.putCard(app, db, card_id);

      if (await iAmLast()) {
        await Game.setStatus(app, db, room_id, gameSt.allCardSet);
      }

      res.json({
        success: true
      });
    } catch (error) {

      return res.json({
        success: false,
        error: error,
      });
    }
  })
};

async function iAmLast() {
  const players_count = await Party.getPlayersCount(app, db, room_id);
  const cards = await Table.getCardsList(app, db, room_id);

  return parseInt(players_count) === parseInt(cards.length);
}
