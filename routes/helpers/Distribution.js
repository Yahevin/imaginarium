const sql = require('../mixins/sqlCommands');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');
const cardStatus = require('../mixins/cardStatus');

module.exports = {
	getCardShelter: async function (app, db) {
    const format = db.format(sql.sf, ['card']);
    const results = await dbQuery(format,db);

    if (isNotEmpty(results)) {
      return resolve(results);
    } else {
      throw ('Cards are lost');
    }
	},
};
