const User = require('../helpers/User');
const Game = require('../helpers/Game');
const Hand = require('../helpers/Hand');
const Table = require('../helpers/Table');
const Party = require('../helpers/Party');
const gameSt = require('../mixins/gameStatus');


module.exports = function (app, db) {
	app.post('/put-card', async (req, res) => {
	  try {
      const card_id = req.body.card_id,
            room_id = req.body.room_id,
            user_id = req.body.user_id;

      const user_is_main = await User.gameMaster(user_id);

      await Hand.moveToTable(app, db, card_id);

      async function iAmLast() {
        const players_count = await Party.getPlayersCount(app, db, room_id);
        const cards         = await Table.getCardsList(app, db, room_id);

        return parseInt(players_count) === parseInt(cards.length);
      }

      if (user_is_main) {
        await Game.setStatus(app, db, room_id, gameSt.gmCardSet)
      } else {
        if (await iAmLast()) {
          const statusSet = await Game.setStatus(app, db, room_id, gameSt.allCardSet);

          res.json({success: statusSet});
        } else {
          res.json({success: true});
        }
      }
	  } catch(error) {

      return res.json({
        success: false,
        error: error,
      });
    }
	})
};
