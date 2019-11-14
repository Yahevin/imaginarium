const sql = require('./sqlCommands');

module.exports = async function(app, db) {
	let gameSt = {
		start: 'game-start',
		gmCardSet: 'gm-card-set',
		allCardSet: 'all-card-set',
	};
	
	//POST
	app.post('/party-create', async (req, res) => {
		let nickName = req.body.nickName,
				userId,
				roomId;
		
		function roomCreate(resolve) {
			let roomCreateReq = db.format(sql.ii2, ["room", "game_action",'player_count', gameSt.start, 1]);
			db.query(roomCreateReq, function (err, results) {
				if (err) throw err;
				roomId = results.insertId;
				return resolve();
			});
		}
		function playerCreate(resolve) {
			let playerCreateReq = db.format(sql.ii1, ['users', 'nick_name', nickName]);
			db.query(playerCreateReq, function (err, results) {
				if (err) throw err;
				userId = results.insertId;
				return resolve();
			});
		}
		function chainPlayer() {
			let chainPlayerReq = db.format(sql.ii2, ['user__room', 'room_id', 'user_id', roomId, userId]);
			db.query(chainPlayerReq, function (err, results) {
				if (err) throw err;
				res.json({success: true});
			});
		}
		
		new Promise(resolve => {
			roomCreate(resolve);
		}).then(() => {
			new Promise(resolve => {
				playerCreate(resolve)
			}).then(() => {
				chainPlayer()
			})
		})
	});
	
	
	app.post('/card-main', async (req, res) => {
		let cardId = req.body.cardId,
				roomId = req.body.gameId,
				imgUrl = req.body.imgUrl,
				tableCard;

		function addMainCard (resolve) {
			let addMainCardReq = db.format(sql.ii4,
				['cards_on_table','img_url', 'card_id', 'is_main', 'has_mark', imgUrl, cardId, true, false]);
			db.query(addMainCardReq, function (err, results) {
				if (err) throw err;
				tableCard = results.insertId;
				return resolve();
			});
		}
		function noteTableCard (resolve) {
			let noteTableCardReq = db.format(sql.ii2,
				['room__table','room_id', 'table_card_id', roomId, tableCard]);
			db.query(noteTableCardReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		function changeGameStatus() {
			let changeGameStatusReq = db.format(sql.usw,
				['room', 'game_action', gameSt.gmCardSet, 'id', roomId]);
			db.query(changeGameStatusReq, function(err, results) {
				if (err) throw err;
				res.json({success: true});
			});
		}
		
		new Promise(resolve => {
			addMainCard(resolve);
		}).then(() => {
			new Promise(resolve => {
				noteTableCard(resolve);
			}).then(()=>{
				changeGameStatus();
			})
		});
	});
	
	
	app.post('/table-clear', async (req, res) => {
		let tableCards=[],
			roomId = req.body.gameId;
		
		function getTableCards(resolve) {
			let getTableCardsReq = db.format(sql.sfw,
				['room__table','room_id', roomId]);
			db.query(getTableCardsReq, function (err, results) {
				if (err) throw err;
				tableCards = results.map((item) => {
					if (item.hasOwnProperty('table_card_id')) {
						return item.table_card_id
					}
				});
				return resolve();
			});
		}
		function cleanTableCards() {
			tableCards.forEach((currentId,index)=>{
				let cleanTableCardsReq = db.format(sql.dfw,
					['cards_on_table', 'id', currentId]);
				db.query(cleanTableCardsReq, function (err, results) {
					if (err) throw err;
					if(index >= (tableCards.length - 1)) {
						res.json({success: true});
					}
				});
			});
		}
		
		new Promise(resolve => {
			getTableCards(resolve)
		}).then(()=>{
			cleanTableCards()
		});
	});
	
	
	app.post('/card-fake', async (req, res) => {
		let cardId = req.body.cardId,
				roomId = req.body.gameId,
				imgUrl = req.body.imgUrl,
				playersCount,
				cardsCount,
				tableCard;
			
		function addFakeCard(resolve) {
			let addFakeCardReq = db.format(sql.ii4,
				['cards_on_table','img_url', 'card_id', 'is_main', 'has_mark', imgUrl, cardId, false, false]);
			db.query(addFakeCardReq, function (err, results) {
				if (err) throw err;
				tableCard = results.insertId;
				return resolve();
			});
		}
		function noteTableCard(resolve) {
			let noteTableCardReq = db.format(sql.ii2,
				['room__table', 'room_id', 'table_card_id', roomId, tableCard]);
			db.query(noteTableCardReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		function getCounts(resolveMain) {
			let getPlayersCount = db.format(sql.sfw, ['room', 'id', roomId]),
					getCardsCount = db.format(sql.sfw, ['room__table', 'room_id', roomId]);
			
			new Promise(resolve => {
				db.query(getPlayersCount, function(err, results) {
					if (err) throw err;
					playersCount = results.player_count;
					return resolve();
				});
			}).then(()=>{
					db.query(getCardsCount, function (err, results) {
						if (err) throw err;
						cardsCount = results.length;
						return resolveMain();
					});
			});
		}
		function iAmLast() {
			return cardsCount === playersCount;
		}
		function changeGameStatus() {
			let changeGameStatusReq = db.format(sql.usw,
				['room', 'game_action', gameSt.allCardSet, 'id', roomId]);
			db.query(changeGameStatusReq, function(err, results) {
				if (err) throw err;
				res.json({success: true});
			});
		}
		
		new Promise(resolve => {
			addFakeCard(resolve)
		}).then(() => {
			new Promise(resolve => {
				noteTableCard(resolve)
			}).then(()=>{
				new Promise(resolve => {
					getCounts(resolve);
				}).then(()=>{
					if (iAmLast()) {
						changeGameStatus();
					}
				})
			})
		});
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