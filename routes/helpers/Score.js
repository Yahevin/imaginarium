const sql = require('../mixins/sqlCommands');

module.exports = {
  update: function (app, db, score, rewards) {
    return new Promise((resolve, reject) => {
      try {
        const format = rewards.reduce((accum,reward)=> {
          return accum + db.format(sql.usw, ['users', 'score', reward.score, 'id', reward.id]);
        }, '');

        return db.query(format, function (err, results) {
          if (err) return reject(err);
          return resolve();
        });
      }
      catch (error) {
        return reject(error);
      }
    }).catch((error) => {
      throw {desc: 'Function failed: Score.update', detail: error};
    })
  },
};
