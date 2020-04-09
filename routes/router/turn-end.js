const gameSt = require('../mixins/gameStatus');
const Party = require('../models/Party');
const Game = require('../models/Game');
const User = require('../models/User');


module.exports = function(app, db) {
	app.post('/turn-end', async (req, res) => {
		const room_id = req.body.room_id;

    try {
      await Game.setStatus(app, db, gameSt.start, room_id);

      const users_id_list  =  await Party.getUsersIdList(app, db, room_id);
      const gm_id          =  await User.findGM(app, db, users_id_list);
      const new_gm_id      =  findNewGM(users_id_list, gm_id);

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
