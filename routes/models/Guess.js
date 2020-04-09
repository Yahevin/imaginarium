const sql = require('../mixins/sqlCommands');

module.exports = {
  setQuestionField: function (app, db, room_id) {
    return new Promise((resolve, reject) => {
      try {
        let format = db.format(sql.ii2, ['room__question', 'room_id','question', room_id, '']);

        return db.query(format, function (err, results) {
          if (err) return reject(err);
          return resolve();
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: setQuestionField', detail: error};
    })
  },
	getByUsersId: function (app, db, usersIdList) {
		return new Promise((resolve) => {
      try {
        let format = db.format(sql.sfwi, ['user__guess', 'user_id', usersIdList]);

        return db.query(format, function (err, results) {
          if (err) return reject(err);
          return resolve(results);
        });
      }
      catch (error) {
        return reject(error);
      }
		}).catch((error) => {
      throw {desc: 'Function failed: Guess.getByUsersId', detail: error};
    });
	},
};

