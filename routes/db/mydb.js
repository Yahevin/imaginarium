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
		" player_style VARCHAR(255), " +
		" score INT, " +
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
		" card_id INT, " +
		" img_url VARCHAR(255), " +
		" PRIMARY KEY (id) )";
	
	conn.query(row5, function(err, results) {
		if (err) throw err;
	});
	
	
	let row6 = "CREATE TABLE IF NOT EXISTS cards_on_table" +
		" (id INT not null AUTO_INCREMENT, " +
		" card_id INT, " +
		" img_url VARCHAR(255), " +
		" is_main BOOLEAN, " +
		" PRIMARY KEY (id) )";
	
	conn.query(row6, function(err, results) {
		if (err) throw err;
	});
	
	
	let row7 = "CREATE TABLE IF NOT EXISTS user__hand" +
		" (id INT not null AUTO_INCREMENT, " +
		" user_id INT, " +
		" hand_card_id INT, " +
		" FOREIGN KEY (user_id) REFERENCES users(id)" +
		" ON DELETE CASCADE, " +
		" FOREIGN KEY (hand_card_id) REFERENCES cards_in_hand(id)" +
		" ON DELETE CASCADE, " +
		" PRIMARY KEY (id) )";

	conn.query(row7, function(err, results) {
		if (err) throw err;
	});
	
	
	let row8 = "CREATE TABLE IF NOT EXISTS room__table" +
		" (id INT not null AUTO_INCREMENT, " +
		" room_id INT, " +
		" table_card_id INT, " +
		" FOREIGN KEY (room_id) REFERENCES room(id)" +
		" ON DELETE CASCADE, " +
		" FOREIGN KEY (table_card_id) REFERENCES cards_on_table(id)" +
		" ON DELETE CASCADE, " +
		" PRIMARY KEY (id) )";

	conn.query(row8, function(err, results) {
		if (err) throw err;
	});
	
	
	let row9 = "CREATE TABLE IF NOT EXISTS room__hand" +
		" (id INT not null AUTO_INCREMENT, " +
		" room_id INT, " +
		" hand_card_id INT, " +
		" FOREIGN KEY (room_id) REFERENCES room(id)" +
		" ON DELETE CASCADE, " +
		" FOREIGN KEY (hand_card_id) REFERENCES cards_in_hand(id)" +
		" ON DELETE CASCADE, " +
		" PRIMARY KEY (id) )";

	conn.query(row9, function(err, results) {
		if (err) throw err;
	});
	
	
	let row10 = "CREATE TABLE IF NOT EXISTS distribution" +
		" (id INT not null AUTO_INCREMENT, " +
		" room_id INT, " +
		" PRIMARY KEY (id) )";
	
	conn.query(row10, function(err, results) {
		if (err) throw err;
	});
	
	
	let row11 = "CREATE TABLE IF NOT EXISTS in_basket" +
		" (id INT not null AUTO_INCREMENT, " +
		" distribution_id INT, " +
		" card_id INT, " +
		" FOREIGN KEY (distribution_id) REFERENCES distribution(id)" +
		" ON DELETE CASCADE, " +
		" PRIMARY KEY (id) )";

	conn.query(row11, function(err, results) {
		if (err) throw err;
	});
	
	
	let row12 = "CREATE TABLE IF NOT EXISTS new_cards" +
		" (id INT not null AUTO_INCREMENT, " +
		" user_id INT, " +
		" card_id INT, " +
		" FOREIGN KEY (user_id) REFERENCES users(id)" +
		" ON DELETE CASCADE, " +
		" PRIMARY KEY (id) )";

	conn.query(row12, function(err, results) {
		if (err) throw err;
	});
	
	
	let row13 = "CREATE TABLE IF NOT EXISTS user__table" +
		" (id INT not null AUTO_INCREMENT, " +
		" user_id INT, " +
		" table_card_id INT, " +
		" is_main BOOLEAN, " +
		" FOREIGN KEY (user_id) REFERENCES users(id)" +
		" ON DELETE CASCADE, " +
		" FOREIGN KEY (table_card_id) REFERENCES cards_on_table(id)" +
		" ON DELETE CASCADE, " +
		" PRIMARY KEY (id) )";
	
	conn.query(row13, function(err, results) {
		if (err) throw err;
	});
	
	
	let row14 = "CREATE TABLE IF NOT EXISTS user__guess" +
		" (id INT not null AUTO_INCREMENT, " +
		" user_id INT, " +
		" guess_id INT, " +
		" player_style VARCHAR(255), " +
		" FOREIGN KEY (user_id) REFERENCES users(id)" +
		" ON DELETE CASCADE, " +
		" FOREIGN KEY (guess_id) REFERENCES cards_on_table(id)" +
		" ON DELETE CASCADE, " +
		" PRIMARY KEY (id) )";
	
	conn.query(row14, function(err, results) {
		if (err) throw err;
	});
	
	let row15 = "CREATE TABLE IF NOT EXISTS room__question" +
		" (id INT not null AUTO_INCREMENT, " +
		" room_id INT, " +
		" question VARCHAR(255), " +
		" FOREIGN KEY (room_id) REFERENCES room(id)" +
		" ON DELETE CASCADE, " +
		" PRIMARY KEY (id) )";
	
	conn.query(row15, function(err, results) {
		if (err) throw err;
	});
});

module.exports = conn;