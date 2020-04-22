const gameSt = require('../mixins/gameStatus');
const Table = require('../models/Table');
const Party = require('../models/Party');
const Guess = require('../models/Guess');
const Game = require('../models/Game');


module.exports = function(app, db) {
	app.post('/card-guess', async (req, res) => {
		const user_id = req.body.user_id,
			room_id = req.body.room_id,
			guess_id = req.body.guess_id,
			player_style = req.body.player_style;

		try {
		  const table_item = await Table.getItem(app, db, user_id);
      const checked    = table_item.hasOwnProperty('table_card_id') && table_item.table_card_id !== parseInt(guess_id);

      if (!checked) {
        return res.json({success: false});
      }

      await Guess.make(app, db, user_id, guess_id, player_style);

      const users_id_list = await Party.getUsersIdList(app, db, room_id);
      const users_voted   = await Guess.getVoteList(app, db, users_id_list);
      const voted_count   = users_voted.length;
      const user_count    = users_id_list.length;
      const last_vote     = voted_count === (user_count - 1);

      if (last_vote) {
        await Game.setStatus(app, db, gameSt.allGuessDone, room_id);

        return res.json ({success: true, iAmLast: true});
      } else {
        return res.json({success: true, iAmLast: false});
      }
    } catch (error) {
      return res.json ({
        success: false,
        error: error,
      });
    }
	});
}
