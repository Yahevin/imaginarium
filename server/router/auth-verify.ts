import { TResponseFunc, TRequest } from '@imaginarium/packages/types';
import { ROUTES } from '@imaginarium/packages/constants';
import { TAuthVerify } from '@imaginarium/packages/interfaces/parts/routes/TAuthVerify';
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
