module.exports = {
	 sf: "SELECT * FROM ??",
	sfw: "SELECT * FROM ?? WHERE ?? = ?",
 sfwi: "SELECT * FROM ?? WHERE ?? IN (?)",
	dfw: "DELETE FROM ?? WHERE ?? = ?",
 dfwi: "DELETE FROM ?? WHERE ?? IN (?)",

	ii1: "INSERT INTO ?? ( ?? ) VALUES (?)",
	ii2: "INSERT INTO ?? ( ??, ?? ) VALUES (?, ?)",
	ii3: "INSERT INTO ?? ( ??, ??, ??) VALUES (?, ?, ?)",
	ii4: "INSERT INTO ?? ( ??, ??, ??, ??) VALUES (?, ?, ?, ?)",
	ii5: "INSERT INTO ?? ( ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)",
	
	im1: "INSERT INTO ?? ( ?? ) VALUES ?",
	im2: "INSERT INTO ?? ( ??, ?? ) VALUES ?",
	im3: "INSERT INTO ?? ( ??, ??, ??) VALUES ?",
	im4: "INSERT INTO ?? ( ??, ??, ??, ??) VALUES ?",
	im5: "INSERT INTO ?? ( ??, ??, ??, ??, ??) VALUES ?",
	
	usw: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
 ussw: "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?",
};
