const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  connectTimeout: 10000000000000,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
};

conn = mysql.createConnection(config);

conn.connect(function (err, result) {
  if (err) console.log(err);

  const user = "CREATE TABLE IF NOT EXISTS user" +
    " (id INT not null AUTO_INCREMENT, " +
    " nick_name VARCHAR(255), " +
    " password VARCHAR(255), " +
    " experience INT, " +
    " PRIMARY KEY (id) )";

  conn.query(user, function (err, results) {
    if (err) throw err;
  });


  const room = "CREATE TABLE IF NOT EXISTS room" +
    " (id INT not null AUTO_INCREMENT, " +
    " game_action VARCHAR(255), " +
    " game_name VARCHAR(255), " +
    " player_count INT, " +
    " created_at BIGINT, " +
    " PRIMARY KEY (id) )";

  conn.query(room, function (err, results) {
    if (err) throw err;
  });


  const user__room = "CREATE TABLE IF NOT EXISTS user__room" +
    " (id INT not null AUTO_INCREMENT, " +
    " user_id INT, " +
    " room_id INT, " +
    " score INT, " +
    " is_active BOOLEAN, " +
    " game_master BOOLEAN, " +
    " player_style VARCHAR(255), " +
    " FOREIGN KEY (user_id) REFERENCES user(id)" +
    " ON DELETE CASCADE, " +
    " FOREIGN KEY (room_id) REFERENCES room(id)" +
    " ON DELETE CASCADE, " +
    " PRIMARY KEY (id) )";

  conn.query(user__room, function (err, results) {
    if (err) throw err;
  });


  const shelter = "CREATE TABLE IF NOT EXISTS shelter" +
    " (id INT not null AUTO_INCREMENT, " +
    " img_url VARCHAR(255), " +
    " PRIMARY KEY (id) )";

  conn.query(shelter, function (err, results) {
    if (err) throw err;
  });


  const basket = "CREATE TABLE IF NOT EXISTS basket" +
    " (id INT not null AUTO_INCREMENT, " +
    " room_id INT, " +
    " FOREIGN KEY (room_id) REFERENCES room(id)" +
    " ON DELETE CASCADE, " +
    " PRIMARY KEY (id) )";

  conn.query(basket, function (err, results) {
    if (err) throw err;
  });


  const card = "CREATE TABLE IF NOT EXISTS card" +
    " (id INT not null AUTO_INCREMENT, " +
    " img_url VARCHAR(255), " +
    " origin_id INT, " +
    " player_id INT, " +
    " basket_id INT, " +
    " status INT, " +
    " is_main BOOLEAN," +
    " FOREIGN KEY (origin_id) REFERENCES shelter(id)" +
    " ON DELETE CASCADE, " +
    " FOREIGN KEY (player_id) REFERENCES user__room(id)" +
    " ON DELETE CASCADE, " +
    " FOREIGN KEY (basket_id) REFERENCES basket(id)" +
    " ON DELETE CASCADE, " +
    " PRIMARY KEY (id) )";

  conn.query(card, function (err, results) {
    if (err) throw err;
  });


  const guess = "CREATE TABLE IF NOT EXISTS guess" +
    " (id INT not null AUTO_INCREMENT, " +
    " card_id INT, " +
    " player_id INT, " +
    " basket_id INT, " +
    " FOREIGN KEY (card_id) REFERENCES card(id)" +
    " ON DELETE CASCADE, " +
    " FOREIGN KEY (player_id) REFERENCES user__room(id)" +
    " ON DELETE CASCADE, " +
    " FOREIGN KEY (basket_id) REFERENCES basket(id)" +
    " ON DELETE CASCADE, " +
    " PRIMARY KEY (id) )";

  conn.query(guess, function (err, results) {
    if (err) throw err;
  });


  const question = "CREATE TABLE IF NOT EXISTS question" +
    " (id INT not null AUTO_INCREMENT, " +
    " question VARCHAR(255), " +
    " room_id INT, " +
    " card_id INT, " +
    " FOREIGN KEY (room_id) REFERENCES room(id)" +
    " ON DELETE CASCADE, " +
    " FOREIGN KEY (card_id) REFERENCES card(id)" +
    " ON DELETE CASCADE, " +
    " PRIMARY KEY (id) )";

  conn.query(question, function (err, results) {
    if (err) throw err;
  });
});

module.exports = conn;
