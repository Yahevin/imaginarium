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
	
	console.log("Connected!");
	
	// Drop EMPLOYEES table if Exists!!
	var sql1 = "DROP TABLE IF EXISTS users ";
	
	conn.query(sql1, function(err, results) {
		if (err) throw err;
		console.log("Table users dropped");
	});
	
	// Create EMPLOYEES Table.
	var sql2 = "CREATE TABLE users " +
		" (Id INT not null AUTO_INCREMENT, " +
		" Emp_No VARCHAR(20), " +
		" Full_Name VARCHAR(255), " +
		" Hire_Date DATE, " +
		" PRIMARY KEY (Id) )";
	
	conn.query(sql2, function(err, results) {
		if (err) throw err;
		console.log("Table users created");
	});
	
	var empNos = ["E01", "E02", "E03"];
	var fullNames = ["John", "Smith", "Gates"];
	var hireDates = ["22/10/2001", "11/11/2000", "12/12/1990"];
	
	// Insert Datas to EMPLOYEES.
	for (var i = 0; i < empNos.length; i++) {
		var sql3 = "Insert into users (Emp_No, Full_Name, Hire_Date) " //
			+
			" Values ('" + empNos[i] + "', '" + fullNames[i] + "', STR_TO_DATE('" + hireDates[i] + "', '%d/%m/%Y') )";
		
		conn.query(sql3, function(err, results) {
			if (err) throw err;
			console.log("Insert a record!");
		});
	}
});

module.exports = conn;