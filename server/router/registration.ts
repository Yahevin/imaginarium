import { TResponseFunc, TRequest } from '@imaginarium/packages/types';
import { ROUTES } from '@imaginarium/packages/constants';
import { TAuthentication } from '@imaginarium/packages/interfaces';
import { generateToken } from '../utils';
import { User } from '../queries';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.REGISTRATION, async (req: TRequest<TAuthentication>, res: TResponseFunc<TAuthentication>) => {
    const { nick_name } = req.body;
    const { password } = req.body;

    try {
      const id = await User.create({ app, db, nick_name, password });
      const { experience } = await User.get({ app, db, user_id: id, by: 'id' });

      const token = generateToken(id);

      return res.json({
        success: true,
        id,
        token,
        experience,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
