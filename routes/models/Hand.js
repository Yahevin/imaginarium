const sql = require('../mixins/sqlCommands');

module.exports = {
	getUsersCardList: async function (app, db, user_id) {
		return new Promise(async (resolve) => {
			let format = db.format(sql.sfw, ['user__hand', 'user_id', user_id]);
			
			return db.query(format, function (err, results) {
				if (err) throw err;
				return resolve(results);
			});
		});
	},
	getCards: async function (app, db, hand_id_list) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.sfwi, ['cards_in_hand', 'id', hand_id_list]);
			
			return db.query(format, (err, results) => {
				if (err) return reject(err);
				
				return resolve(results);
			});
		}).catch((err) => {
			return [];
		})
	},
	getSortedByRoom: async function (app, db, room_id) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.sfw, ['room__hand', 'room_id', room_id]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				
				const hand_id_list = results.map((item) => {
					return item.hand_card_id;
				});
				
				return resolve(hand_id_list);
			});
		}).catch((err) => {
			return [];
		})
	},
	removeCard: async function (app, db, hand_card_id) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.dfw, ['cards_in_hand', 'id', hand_card_id]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(true);
			});
		}).catch((err) => {
			console.log(err);
			return false;
		})
	},
  takeTo: async function (app, db, cards) {
		return new Promise(async (resolve, reject) => {
		  const row = cards.map((item)=>{
        return [item.card_id, item.img_url]
      });

			const format = db.format(sql.im2, ['cards_in_hand', 'card_id', 'img_url', row]);

			return db.query(format, function (err, results) {
				if (err) return reject(err);
				return resolve(results);
			});
		}).catch((error) => {
      throw {desc: 'Function failed: takeTo', detail: error};
		})
	},
  chainTo: function (direction) {
	  return function (app, db, id , hand_items_id_list) {
      const row = hand_items_id_list.map((item)=>{
          return [id, item];
      });
      const format =  db.format(sql.im2, [direction, 'user_id', 'hand_card_id', row]);

      return new Promise((resolve, reject) => {
        return db.query(format, function (err, results) {
          if (err) return reject(err);
          return resolve(true);
        });
      }).catch((error) => {
        throw {desc: 'Function failed: takeTo', detail: error};
      })
    }
  },
};
