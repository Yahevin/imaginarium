const jwt = require('jsonwebtoken');

export const generateToken = (code: string | number) => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt?.sign({ user_id: code }, process.env.TOKEN, { expiresIn: '1800s' });
};
