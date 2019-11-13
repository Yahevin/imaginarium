module.exports = async function(app, db) {
	let gameSt = {
		start: 'game-start',
		gmCardSet: 'gm-card-set',
	};
	
	
	//POST
	app.post('/party-create', async (req, res) => {
		let nickName = req.body.nickName,
			sql1 = "INSERT INTO ?? ( ?? ) VALUES (?)",
			sql2 = "INSERT INTO ?? ( ??, ?? ) VALUES (?, ?)",
			userId,
			roomId;
		
		let roomCreate = db.format(sql1, ["room", "game_action", gameSt.start]);
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
		let cardId = req.body.cardId,
				roomId = req.body.gameId,
				imgUrl = req.body.imgUrl,
				cleanTableCards = db.format("TRUNCATE TABLE ??", 'cards_on_table'),
				addMainCard = db.format(
					"INSERT INTO ?? ( ??, ??, ??, ??) VALUES (?, ?, ?, ?)",
					['cards_on_table','img_url', 'card_id', 'is_main', 'has_mark', imgUrl, cardId, true, false]
				),
				changeGameStatus = db.format(
					"UPDATE ?? SET ?? = ? WHERE ?? = ?",
					['room', 'game_action', gameSt.gmCardSet, 'id' ,roomId]
				);
		
		db.query(cleanTableCards, function(err, results) {
			if (err) throw err;
		});
		db.query(addMainCard, function(err, results) {
			if (err) throw err;
		});
		db.query(changeGameStatus, function(err, results) {
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