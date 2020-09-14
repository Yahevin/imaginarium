const gameSt = require('../mixins/gameStatus');
const Party = require('../helpers/Party');
const Guess = require('../helpers/Guess');

module.exports = function(app, db) {
	app.post('/party-create', async (req, res) => {
		const user_id = req.body.user_id;

    try {
      const room_id = await Party.create(app, db);
      await Party.addPlayer(app, db, room_id, user_id);
      await Guess.createQuestion(app, db, room_id);

      return res.json({
        success: true,
        room_id: room_id,
        game_master: true,
        game_action: gameSt.prepare,
      })
    }
    catch(error) {
      return res.json({
        success: false,
        error: error,
      });
    }
	});
};
