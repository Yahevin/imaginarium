const sql = require('../mixins/sqlCommands');

module.exports = {
	getUsersIn: function (app, db, room_id) {
		return new Promise((resolve, reject) => {
      try {
        let format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);

        return db.query(format, function (err, results) {
          if (err) return reject(err);
          return resolve(results);
        });
      }
      catch (error) {
        return reject(error);
      }
		}).catch((error) => {
			throw {desc: 'Function failed: getUsersIn', detail: error};
		})
	},
	getUsersIdList: function (app, db, room_id) {
		return new Promise((resolve, reject) => {
      try {
        let format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);

        return db.query(format, function (err, results) {
          if (err) return reject(err);
          if(results.length > 0) {
            let users = results.map ((item) => {
              return item.user_id;
            });
            return resolve (users);
          } else {
            return resolve ([]);
          }
			  });
      }
      catch (error) {
        return reject(error);
      }
		}).catch((error) => {
      throw {desc: 'Function failed: getUsersIdList', detail: error};
		})
	},
	getPlayersCount: function (app, db, room_id) {
		return new Promise((resolve, reject) => {
			let format = db.format(sql.sfw, ['room', 'id', room_id]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				if(results.length > 0 && results[0].hasOwnProperty('player_count')) {
          return resolve(results[0].player_count);
        } else {
          reject('room_id is incorrect');
        }
			});
		}).catch((error) => {
      throw {desc: 'Function failed: getPlayersCount', detail: error};
		})
	},
  exist: function (app, db, room_id) {
    return new Promise((resolve, reject) => {
      try {
        let format = db.format(sql.sfw, ['room', 'id', room_id]);

        return db.query(format, function (err, results) {
          if (err) return reject(err);
          return resolve(results.length > 0);
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: Party.exist', detail: error};
    })
  },
  addPlayer: function (app, db, room_id, user_id) {
    return new Promise((resolve, reject) => {
      try {
        let format = db.format(sql.ii2, ['user__room', 'room_id', 'user_id', room_id, user_id]);

        return db.query(format, function (err, results) {
          if (err) return reject(err);
          return resolve(results);
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: addPlayer', detail: error};
    })
  },
  countUpdate: function (app, db, new_count, room_id) {
    return new Promise((resolve, reject) => {
      try {
        let format = db.format(sql.usw, ['room', 'player_count', new_count, 'id', room_id]);

        return db.query(format, function (err, results) {
          if (err) return reject(err);
          return resolve();
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: addPlayer', detail: error};
    })
  },
};
