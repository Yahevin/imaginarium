/* eslint-disable no-magic-numbers */
const jwt = require('jsonwebtoken');

export const authToken = (req: any): { user_id: number } => {
  const token = req?.headers?.cookie?.replace('token=', '') ?? '';

  return jwt.verify(token, process.env.TOKEN);
};
