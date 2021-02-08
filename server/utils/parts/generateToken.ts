const jwt = require('jsonwebtoken');

export const generateToken = (code: any) => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(code, process.env.TOKEN, { expiresIn: '1800s' });
};
