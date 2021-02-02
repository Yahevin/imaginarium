import { TResponseFunc } from '@my-app/types';
import { ROUTES } from '@my-app/constants';
import { TAuthVerify } from '@my-app/interfaces/parts/routes/TAuthVerify';
import { User } from '../helpers/User';

const jwt = require('jsonwebtoken');

module.exports = (app: any, db: any) => {
  app.post(ROUTES.AUTH_VERIFY, async (req: any, res: TResponseFunc<TAuthVerify>) => {
    const token = req.headers.cookie.replace('token=', '');

    try {
      const { user_id } = jwt.verify(token, process.env.TOKEN);
      const { nick_name, experience } = await User.get({ app, db, user_id, by: 'id' });

      return res.json({
        success: true,
        experience,
        nick_name,
        user_id,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
