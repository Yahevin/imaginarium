/* eslint-disable no-magic-numbers */
const jwt = require('jsonwebtoken');

export const authToken = (req: any): { user_id: number } => {
  const cookie: string[] = req?.headers?.cookie.split('; ');
  let token = '';

  cookie.forEach((item) => {
    const token_parts = item.split('=');

    if (token_parts[0] === 'imaginarium_token') token = token_parts[1];
  });

  return jwt.verify(token, process.env.TOKEN);
};
