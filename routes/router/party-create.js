const gameSt = require('../mixins/gameStatus');
const Party = require('../helpers/Party');
const Guess = require('../helpers/Guess');
const User = require('../helpers/User');

module.exports = function(app, db) {
	app.post('/party-create', async (req, res) => {
		let nickName = req.body.nickName;

    try {
      const room_id = await Party.create(app, db);
      const user_id = await User.create(app, db, nickName, true);
      await Party.addPlayer(app, db, room_id, user_id);
      await Guess.setQuestionField(app, db, room_id);

      return res.json({
        success: true,
        room_id: room_id,
        user_id: user_id,
        nick_name: nickName,
        player_style: null,
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
