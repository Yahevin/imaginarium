const Party = require('../models/Party');
const Guess = require('../models/Guess');

module.exports = function(app, db) {
	app.get('/get-marks', async (req, res) => {
		
		async function getUsersId() {
			try {
				const results = await Party.getUsersIn(app, db, req.body.room_id);
				
				return results.map((item) => {
					return item.user_id;
				});
			}
			catch (error) {
				console.log(error);
			}
		}
		async function getMembersGuess(membersId) {
			try {
				return await Guess.getByUsersId(app,db,membersId)
			}
			catch (error) {
				console.log(error);
			}
		}
		
		const membersId = await getUsersId();
		const guesses = await getMembersGuess(membersId);
		
		res.json(guesses);
	});
};