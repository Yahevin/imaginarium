const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
	app.post('/add-card', async (req, res) => {
		let post = req.body.img_url.split(',');
        post = post.length > 1 ? post : post[0];

    const sqlFormat = sql.insertVar(post);
    const format    = db.format(sqlFormat, ['cards', 'img_url', ...post]);

    db.query (format, function (err, results) {
      if (err) return res.json ({success: false, err: err, format: format});
      res.json ({success: true});
    });
	});
};
