const sql = require('../mixins/sqlCommands');

module.exports = {
	getSortedByRoom: function (app, db, room_id) {
		return new Promise((resolve) => {
			let format = db.format(sql.sfw, ['distribution', 'room_id', room_id]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(results[0].id);
			});
		}).catch((error) => {
      throw {desc: 'Function failed: Distribution.getSortedByRoom', detail: error};
		})
	},
	getCardShelter: function (app, db) {
		return new Promise((resolve) => {
			let format = db.format(sql.sf, ['cards']);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(results);
			});
		}).catch((error) => {
      throw {desc: 'Function failed: Distribution.getCardShelter', detail: error};
		})
	},
  getSelf: function (app, db, room_id) {
    return new Promise((resolve) => {
      try {
        let format = db.format(sql.sfw, ['distribution', 'room_id', room_id]);

        return db.query (format, function (err, results) {
          if (err) reject (err);
          if(results.length > 0) {
            return resolve (results[0]);
          } else {
            return reject('Distribution not found');
          }
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: Distribution.getSelf', detail: error};
    })
  },
  moveToBasket: function (app, db, distribution, cards_id_list) {
    return new Promise((resolve) => {
      try {
        const row = cards_id_list.map((item)=>{
          return [distribution,item]
        });

        let format = db.format(sql.im2, ['in_basket', 'distribution_id', 'card_id', row]);

        return db.query (format, function (err, results) {
          if (err) return reject(err);
          return resolve();
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: Distribution.moveToBasket', detail: error};
    })
  },
};
