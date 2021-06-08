import { ROUTES } from '@imaginarium/packages/constants';
import { TRequest, TResponseFunc } from '@imaginarium/packages/types';
import { TGetAction } from '@imaginarium/packages/interfaces';
import { authToken } from '../utils';
import { Party } from '../queries';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.GET_ACTION, async (req: TRequest<TGetAction>, res: TResponseFunc<TGetAction>) => {
    try {
      authToken(req);
      const { room_id } = req.body;
      const { game_action } = await Party.getRoom({ app, db, room_id });

      res.json({
        success: true,
        game_action,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
