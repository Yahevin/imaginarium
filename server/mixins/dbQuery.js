module.exports = (format, db) => {
  return new Promise((resolve, reject) => {
    return db.query(format, function (err, results) {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};
