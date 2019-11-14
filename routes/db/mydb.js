const mysql = require('mysql');

conn = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database: 'testDB',
	port: 3306,
});

conn.connect(function(err,result) {
	if (err) throw err;
	
	let row1 = "CREATE TABLE IF NOT EXISTS users" +
		" (id INT not null AUTO_INCREMENT, " +
		" nick_name VARCHAR(255), " +
		" game_master BOOLEAN, " +
		" status VARCHAR(255), " +
		" PRIMARY KEY (id) )";
	
	conn.query(row1, function(err, results) {
		if (err) throw err;
	});
	
	let row2 = "CREATE TABLE IF NOT EXISTS room" +
		" (id INT not null AUTO_INCREMENT, " +
		" game_action VARCHAR(255), " +
		" player_count INT, " +
		" PRIMARY KEY (id) )";
	
	conn.query(row2, function(err, results) {
		if (err) throw err;
	});
	
	let row3 = "CREATE TABLE IF NOT EXISTS user__room" +
		" (id INT not null AUTO_INCREMENT, " +
		" room_id INT, " +
		" user_id INT, " +
		" FOREIGN KEY (room_id) REFERENCES room(id)" +
		" ON DELETE CASCADE, " +
		" FOREIGN KEY (user_id) REFERENCES users(id)" +
		" ON DELETE CASCADE, " +
		" PRIMARY KEY (id) )";
	
	conn.query(row3, function(err, results) {
		if (err) throw err;
	});
	
	let row4 = "CREATE TABLE IF NOT EXISTS cards" +
		" (id INT not null AUTO_INCREMENT, " +
		" img_url VARCHAR(255), " +
		" PRIMARY KEY (id) )";
	
	conn.query(row4, function(err, results) {
		if (err) throw err;
	});
	
	let row5 = "CREATE TABLE IF NOT EXISTS cards_in_hand" +
		" (id INT not null AUTO_INCREMENT, " +
		" img_url VARCHAR(255), " +
		" card_id INT, " +
		" PRIMARY KEY (id) )";
	
	conn.query(row5, function(err, results) {
		if (err) throw err;
	});
	
	let row6 = "CREATE TABLE IF NOT EXISTS cards_on_table" +
		" (id INT not null AUTO_INCREMENT, " +
		" img_url VARCHAR(255), " +
		" card_id INT, " +
		" is_main BOOLEAN, " +
		" has_mark BOOLEAN, " +
		" player_style VARCHAR(255), " +
		" PRIMARY KEY (id) )";
	
	conn.query(row6, function(err, results) {
		if (err) throw err;
	});
	
	let row7 = "CREATE TABLE IF NOT EXISTS user__hand" +
		" (id INT not null AUTO_INCREMENT, " +
		" user_id INT, " +
		" hand_card_id INT, " +
		" PRIMARY KEY (id) )";
	
	conn.query(row7, function(err, results) {
		if (err) throw err;
	});
	
	let row8 = "CREATE TABLE IF NOT EXISTS room__table" +
		" (id INT not null AUTO_INCREMENT, " +
		" room_id INT, " +
		" table_card_id INT, " +
		" PRIMARY KEY (id) )";
	
	conn.query(row8, function(err, results) {
		if (err) throw err;
	});
});

module.exports = conn;