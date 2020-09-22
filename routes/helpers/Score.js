const sql = require('../mixins/sqlCommands');
const dbQuery = require('../mixins/dbQuery');

module.exports = {
  updateLocal: async function (app, db, room_id, rewards) {
    const promises = rewards.map((reward) => {
      return async function () {
        const format = db.format(sql.usw, ['user__room', 'score', reward.score, 'player_id', reward.player_id]);
        await dbQuery(format, db);
      }
    });

    await Promise.all(promises);

    return {success: true};
  },
};
