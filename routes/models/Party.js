const sql = require('../mixins/sqlCommands');

module.exports = {
	getUsersIn: async function (app, db, roomId) {
		return new Promise(async (resolve) => {
			let format = db.format(sql.sfw, ['user__room', 'room_id', roomId]);
			
			return db.query(format, function (err, results) {
				if (err) throw err;
				return resolve(results);
			});
		});
	},
};