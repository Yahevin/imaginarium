const User = require('../models/User');
const Game = require('../models/Game');
const Hand = require('../models/Hand');
const Table = require('../models/Table');
const Party = require('../models/Party');
const gameSt = require('../mixins/gameStatus');


module.exports = function (app, db) {
	app.post('/card-put', async (req, res) => {
		let hand_card_id = req.body.id,
			card_id = req.body.card_id,
			room_id = req.body.room_id,
			user_id = req.body.user_id,
			img_url = req.body.img_url;
		
		
		const user_is_main = await User.gameMaster(user_id);
		const insert_id = await Table.putCard(app, db, img_url, card_id, user_is_main);
		
		await Table.noteTheCard(app, db, user_id, room_id, insert_id, card_id, user_is_main);
		
		await Hand.removeCard(app, db, hand_card_id);
		
		async function iAmLast() {
			const players_count = await Party.getPlayersCount(app, db, room_id);
			const cards_count = await Table.getCardsCount(app, db, room_id);
			
			return parseInt(players_count) === parseInt(cards_count);
		}
		
		if (user_is_main) {
			await Game.setStatus(app, db, gameSt.gmCardSet, room_id)
		} else {
			if (await iAmLast()) {
				const statusSet = await Game.setStatus(app, db, gameSt.allCardSet, room_id);
				
				res.json({success: statusSet});
			} else {
				res.json({success: true});
			}
		}
	})
};
