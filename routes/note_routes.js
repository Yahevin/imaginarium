module.exports = function(app, db) {
	app.post('/notes', async (req, res) => {
		
		res.json(req.body);

	});
	
	app.get('/notes', async (req, res) => {
		let getUsers = "SELECT * FROM users";

		
		db.query(getUsers, function(err, results) {
			if (err) throw err;
			console.log("Table selected");
			res.json(results)
		});
	})
	
};