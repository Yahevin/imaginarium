import { TResponseFunc } from '@my-app/types';
import { TAuthentication } from '@my-app/interfaces';
import { User } from '../queries';
import { generateToken } from '../utils';

module.exports = (app: any, db: any) => {
  app.post('/authentication', async (req: any, res: TResponseFunc<TAuthentication>) => {
    const { nick_name } = req.body;
    const { password } = req.body;

    try {
      const { experience, id } = await User.get({ app, db, nick_name, password, by: 'password' });

      const token = generateToken({ user_id: id });

      return res.json({
        success: true,
        experience,
        token,
        id,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
