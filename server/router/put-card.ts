import { ROUTES } from '@my-app/constants';
import { TResponseFunc, TRequest } from '@my-app/types';
import { TPutTheCard } from '@my-app/interfaces';
import { Player } from '../helpers/Player';
import { authToken } from '../utils/authToken';
import { Table } from '../helpers/Table';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.PUT_CARD, async (req: TRequest<TPutTheCard>, res: TResponseFunc<TPutTheCard>) => {
    try {
      const { user_id } = authToken(req);
      const { card_id } = req.body;
      const { room_id } = req.body;

      const { id: player_id } = await Player.get({ app, db, user_id, room_id, by: 'room' });
      const already_put = await Table.alreadyPut({ app, db, player_id });

      if (already_put) {
        return res.json({
          success: false,
          error: 'You have a card on the table',
        });
      }

      await Table.putCard({ app, db, card_id });

      return res.json({
        success: true,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
