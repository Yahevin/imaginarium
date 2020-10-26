module.exports = function (format,db) {
  const caller_name = arguments.callee.caller.name;

  return new Promise((resolve, reject) => {
    return db.query(format, function (err, results) {
      if (err) return reject(err);
      return resolve(results);
    });
  }).catch((error) => {
    throw {desc: 'Function failed: ' + caller_name, detail: error};
  })
};
