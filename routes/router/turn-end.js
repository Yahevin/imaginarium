const gameSt = require('../mixins/gameStatus');
const Party = require('../helpers/Party');
const Game = require('../helpers/Game');
const User = require('../helpers/User');


module.exports = function(app, db) {
	app.post('/turn-end', async (req, res) => {
		const room_id = req.body.room_id;

    try {
      await Game.setStatus(app, db, room_id, gameSt.start);

      const players_id_list  =  await Party.getPlayersIdList(app, db, room_id);
      const gm_id            =  await User.findGM(app, db, players_id_list);
      const new_gm_id        =  findNewGM(players_id_list, gm_id);

      await User.demoteGM(app, db, gm_id);
      await User.setGM(app, db, new_gm_id);

      return res.json({
        success: true,
      });
    }
    catch(error) {
      return res.json({
        success: false,
        error: error,
      });
    }

		function findNewGM(users, gm_id) {
			let current = 0;
			users.forEach((item, index) => {
				if (parseInt(item) === parseInt(gm_id)) {
					current = index;
				}
			});
			if (current < (users.length - 1)) {
				return users[current + 1];
			} else {
				return users[0];
			}
		}
	});
};
