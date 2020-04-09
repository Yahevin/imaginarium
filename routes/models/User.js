const sql = require('../mixins/sqlCommands');

module.exports = {
  create:       function (app, db, nick_name, game_master = false) {
    return new Promise(async (resolve, reject) => {
      try {
        let format = db.format(sql.ii3, ['users', 'nick_name','game_master','player_style', nick_name, game_master, false, null]);
        return db.query(format, function (err, results) {
          if (err) return reject(err);
          return resolve (results.insertId);
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: User.create', detail: error};
    })
  },
	gameMaster:   function (app, db, user_id) {
		return new Promise(async (resolve, reject) => {
      try {
        let format = db.format(sql.sfw, ['users', 'id', user_id]);

        return db.query(format, function (err, results) {
          if (err) reject(err);
          if (results.length > 0) {
            return resolve (results[0].game_master);
          } else {
            reject('Did not found such user');
          }
        });
      }
      catch (error) {
        return reject(error);
      }
		}).catch((error) => {
      throw {desc: 'Function failed: gameMaster', detail: error};
		})
	},
  find:         function (app, db, nick_name) {
    return new Promise((resolve, reject) => {
      try {
        let format = db.format(sql.sfw, ['users', 'nick_name', nick_name]);
        return db.query(format, function (err, results) {
          if (err) reject(err);
          if(results.length > 0) {
            return resolve({
              data: results[0],
              exist: true,
            });
          } else {
            return resolve({
              exist: false,
            });
          }
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: User.find', detail: error};
    })
  },
};
