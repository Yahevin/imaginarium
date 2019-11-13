module.exports = function(app, db) {
	//POST
	app.post('/party-create', async (req, res) => {
		//req = {nickName}
		//create a party
		//add new player
	});
	
	app.post('/card-main', async (req, res) => {
		//req = {player.id, game.id, card.id, description}
		//note a chosen card
		//change game status
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