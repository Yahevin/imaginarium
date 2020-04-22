const Party = require('../models/Party');
const Guess = require('../models/Guess');
const Table = require('../models/Table');
const Score = require('../models/Score');
const User = require('../models/User');

module.exports = function(app, db) {
	app.post('/count-score', async (req, res) => {
		const room_id = req.body.room_id;

    try {
      const users_id_list = Party.getUsersIdList(app, db, room_id);
      const users         = User.getList(app, db, users_id_list);
      const marks         = Guess.getByUsersId(app, db, users_id_list);
      const table_cards   = Table.getItems(app, db, users_id_list);
      const max           = marks.length;

      const rewards = table_cards.map((card) => {
        let score = 0;
        marks.forEach((mark) => {
          if (card.hasOwnProperty('table_card_id')  && card.table_card_id === mark.guess_id) {
            score++;
          }
        });
        if (card.hasOwnProperty('is_main') && card.is_main) {
          score = score === 0 || score === max
            ? score = -3
            : score += 3;
        }
        return {
          id: card.user_id,
          score: score,
        };
      });

      rewards.forEach(async (reward) => {
        users.forEach ((user) => {
          if (user.id === reward.id) {
            reward.score = +user.score + reward.score;
          }
        });
      });

      await Score.update(app, db, rewards);

      return res.json ({
        success: true,
      });
    } catch (error) {
      return res.json ({
        success: false,
        error: error,
      });
    }
	});
};
