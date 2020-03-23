const sql = require('../mixins/sqlCommands');

module.exports = {
	getByUsersId: async function (app, db, usersIdList) {
		return new Promise(async (resolve) => {
			let format = db.format(sql.sfwi, ['user__guess', 'user_id', usersIdList]);
			
			return db.query(format, function (err, results) {
				if (err) throw err;
				return resolve(results);
			});
		});
	},
};

