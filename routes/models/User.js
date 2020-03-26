const sql = require('../mixins/sqlCommands');

module.exports = {
	gameMaster: async function (app, db, user_id) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.sfw, ['users', 'id', user_id]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(results[0].game_master);
			});
		}).catch((error) => {
			console.log(error);
			return false;
		})
	},
};