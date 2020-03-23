const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
	app.post('/add-card', async (req, res) => {
		let url = req.body.img_url;
		
		let addCardReq = db.format(sql.ii1, ['cards', 'img_url', url]);
		db.query(addCardReq, function (err, results) {
			if (err) throw err;
			res.json({success: true});
		});
	});
};
