import { TResponseFunc, TRequest } from '@my-app/types';
import { ROUTES } from '@my-app/constants';
import { TAuthVerify } from '@my-app/interfaces/parts/routes/TAuthVerify';
import { User } from '../queries';
import { authToken } from '../utils';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.AUTH_VERIFY, async (req: TRequest<TAuthVerify>, res: TResponseFunc<TAuthVerify>) => {
    try {
      const { user_id } = authToken(req);
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
