import { TResponseFunc } from '@my-app/types';
import { ROUTES } from '@my-app/constants';
import { TAuthentication } from '@my-app/interfaces';
import { TRequirement } from '@my-app/types/parts/TRequirement';
import { generateToken } from '../utils/generateToken';
import { User } from '../helpers/User';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.REGISTRATION, async (req: TRequirement<TAuthentication>, res: TResponseFunc<TAuthentication>) => {
    const { nick_name } = req.body;
    const { password } = req.body;

    try {
      const id = await User.create({ app, db, nick_name, password });
      const { experience } = await User.get({ app, db, user_id: id, by: 'id' });
      const token = generateToken(`${id}`);

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
