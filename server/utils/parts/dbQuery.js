import { setTypes } from './setTypes';

export const dbQuery = (format, db) => {
  return new Promise((resolve, reject) => {
    return db.query(format, (err, results) => {
      if (err) return reject(err);

      const fixed = setTypes(results);

      return resolve(fixed);
    });
  });
};
