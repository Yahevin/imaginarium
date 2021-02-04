export const dbQuery = (format, db) => {
  return new Promise((resolve, reject) => {
    return db.query(format, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};
