const sql = require('../mixins/sqlCommands');

module.exports = {
	putCard: function (app, db, img_url, card_id, is_main) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.ii3, ['cards_on_table', 'img_url', 'card_id', 'is_main', img_url, card_id, is_main]);
			db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(results.insertId);
			});
		}).catch((error) => {
			console.log(error);
			return null;
		})
	},
	noteTheCard: async function (app, db, user_id, room_id, table_card_id, card_id, is_main) {
		await this.noteToUser.apply(arguments);
		await this.noteToRoom.apply(arguments);
	},
	noteToUser: function (app, db, user_id, room_id, table_card_id, card_id, is_main) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.ii3,
				['user__table', 'user_id', 'table_card_id', 'is_main', user_id, table_card_id, is_main]);
			
			db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(true);
			});
			
		}).catch((error) => {
			console.log(error);
			return false;
		})
	},
	noteToRoom: function (app, db, user_id, room_id, table_card_id, card_id) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.ii3,
				['room__table', 'room_id', 'table_card_id', 'card_id', room_id, table_card_id, card_id]);
			
			db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(true);
			});
		}).catch((error) => {
			console.log(error);
			return false;
		})
	},
  getItem: function (app, db, user_id) {
    return new Promise((resolve, reject) => {
      try {
        let format = db.format(sql.sfw, ['user__table', 'user_id', user_id]);
        return db.query(format, function (err, results) {
          if (err) return reject(err);
          if (results.length > 0) {
            return resolve (results[0]);
          } else {
            return reject('result is empty');
          }
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: Table.getItem', detail: error};
    })
  },
  getItems: function (app, db, id) {
    return new Promise((resolve, reject) => {
      try {
        const format = id instanceof Array
          ? db.format(sql.sfwi, ['user__table', 'user_id', id])
          : db.format(sql.sfw,  ['room__table', 'room_id', id]);

        return db.query(format, function (err, results) {
          if (err) return reject(err);
          if(results.length > 0) {
            return resolve (results);
          } else {
            return reject('result is empty');
          }
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: Table.getItemsIdList', detail: error};
    })
  },
  getItemsIdList: function (app, db, id) {
    return new Promise((resolve, reject) => {
      try {
        const format = id instanceof Array
          ? db.format(sql.sfwi, ['user__table', 'user_id', id])
          : db.format(sql.sfw,  ['room__table', 'room_id', id]);

        return db.query(format, function (err, results) {
          if (err) return reject(err);
          if(results.length > 0) {
            return resolve (
              results.map((item) => {
                if (item.hasOwnProperty ('table_card_id')) {
                  return item.table_card_id;
                }
              })
            );
          } else {
            return reject('result is empty');
          }
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: Table.getItemsIdList', detail: error};
    })
  },
  getCards: function (app, db, table_items_id_list) {
    return new Promise((resolve, reject) => {
      try {
        let format = db.format(sql.sfwi, ['cards_on_table', 'id', table_items_id_list]);
        return db.query(format, function (err, results) {
          if (err) return reject(err);
          if(results.length > 0) {
            return resolve (results);
          } else {
            return reject('result is empty');
          }
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: Table.getCards', detail: error};
    })
  },
  getCardsCount: function (app, db, room_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let format = db.format (sql.sfw, ['room__table', 'room_id', room_id]);

        db.query (format, function (err, results) {
          if (err) return reject(err);
          return resolve (results.length);
        });
      } catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: Table.getCardsCount', detail: error};
    })
  },
  getCardsIdList: function (app, db, table_items_id_list) {
    return new Promise((resolve, reject) => {
      try {
        let format = db.format(sql.sfwi, ['cards_on_table', 'id', table_items_id_list]);
        return db.query(format, function (err, results) {
          if (err) return reject(err);
          if(results.length > 0) {
            return resolve (
              results.map((item) => {
                if (item.hasOwnProperty('card_id')) {
                  return item.card_id
                }
              })
            );
          } else {
            return reject('result is empty');
          }
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: Table.getCardsIdList', detail: error};
    })
  },
  clear: function (app, db, table_id_list) {
    return new Promise((resolve, reject) => {
      try {
        let format = db.format(sql.dfwi, ['cards_on_table', 'id', table_id_list]);
        return db.query(format, function (err, results) {
          if (err) return reject(err);
          return resolve();
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: Table.clear', detail: error};
    })
  },
};
