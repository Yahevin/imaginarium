const gameSt = require('../mixins/gameStatus');
const Table = require('../helpers/Table');
const Party = require('../helpers/Party');
const Guess = require('../helpers/Guess');
const Game = require('../helpers/Game');


module.exports = function(app, db) {
	app.post('/card-guess', async (req, res) => {
		const user_id = req.body.user_id,
          room_id = req.body.room_id,
          guess_id = req.body.guess_id,
          player_style = req.body.player_style;

		try {
		  const table_card = await Table.getCard(app, db, user_id, room_id);
      const checked    = table_card.hasOwnProperty('table_card_id') && table_card.id !== parseInt(guess_id);

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
