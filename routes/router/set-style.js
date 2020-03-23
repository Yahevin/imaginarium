const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
app.post('/set-style', async (req, res) => {
	let style = req.body.player_style,
		userId = req.body.user_id,
		setStyleReq = db.format(sql.usw,
			['users', 'player_style', style, 'id', userId]);
	
	db.query(setStyleReq, function(err, results) {
		if (err) throw err;
		res.json({success: true});
	});
});
};