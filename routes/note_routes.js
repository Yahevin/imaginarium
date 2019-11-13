module.exports = async function(app, db) {
	//POST
	app.post('/party-create', async (req, res) => {
		let nickName = [req.body.nickName],
			sql1 = "Insert into ?? ( ?? ) Values (?)",
			sql2 = "Insert into ?? ( ??, ?? ) Values (?, ?)",
			userId,
			roomId,
			gameStart = 'game-start';
		
		let roomCreate = db.format(sql1, ["room", "game_action", gameStart]);
		let playerCreate = db.format(sql1, ['users', 'nick_name', nickName]);
		
		new Promise(resolve => {
			return db.query(roomCreate, function (err, results) {
				if (err) throw err;
				roomId = results.insertId;
				return resolve();
			});
		}).then(() => {
			new Promise(resolve => {
				db.query(playerCreate, function (err, results) {
					if (err) throw err;
					userId = results.insertId;
					return resolve();
				});
			}).then(() => {
				let chainPlayer = db.format(sql2, ['user__room', 'room_id', 'user_id', roomId, userId]);
				new Promise(resolve => {
					db.query(chainPlayer, function (err, results) {
						if (err) throw err;
						res.json({success: true});
						return resolve();
					});
				})
			})
		})
	});
	
	
	
	app.post('/card-main', async (req, res) => {
		//req = {player.id, game.id, card.id, description}
		//note a chosen card
		//change game status
		
		let id = req.body.id,
				cleanTableCards = "TRUNCATE TABLE IF EXISTS tableCards",
				addMainCard = "Insert into tableCards (id, isMain)" //
			+ " Values ('" + id + "', '" + true + "')";
		
		db.query(cleanTableCards, function(err, results, next) {
			if (err) throw err;
			next();
		});
		db.query(addMainCard, function(err, results) {
			if (err) throw err;
			res.json({success: true});
		});
		
		
	});
	
	app.post('/card-fake', async (req, res) => {
		//req = {player.id, game.id, card.id}
		//note a chosen card
		//if it last, change game status
	});
	
	app.post('/card-guess', async (req, res) => {
		//req = {player.id, game.id, card.id}
		//note + to player how's card is it
		//if it last, change game status
	});
	
	app.post('/turn-end', async (req, res) => {
		//req = {player.id, game.id}
		//change game status
	});
	
	
	//GET
	app.get('/party-join', async (req, res) => {
		//req = {game.id, nickName}
		//join to party
		//add new player
		//get player data
		//get users
		//get game status
	});
	
	app.get('/new-cards', async (req, res) => {
		//req = {player.id, game.id}
		//note new cards to not allow doubles
		//get new cards
	});
	
	app.get('/table-cards', async (req, res) => {
		//req = {player.id, game.id}
		//get cards on the table (needed to guess)
	});
	
	app.get('/leader-board', async (req, res) => {
		//req = {game.id}
		//get figures position
	});
	
	app.get('/ping', async (req, res) => {
		//req = {player.id, game.id}
		//get game status
		//get player's turn
	});
	
	
	app.get('/all', async (req, res) => {
		let getUsers = "SELECT * FROM users";
		
		db.query(getUsers, function(err, results) {
			if (err) throw err;
			console.log("Table selected");
			res.json(results)
		});
	})
	
};