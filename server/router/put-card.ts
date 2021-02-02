import { ROUTES } from '@my-app/constants';
import { TResponseFunc } from '@my-app/types';
import { Player } from '../helpers/Player';

const Table = require('../helpers/Table');

module.exports = (app: any, db: any) => {
  app.post(ROUTES.PUT_CARD, async (req: any, res: TResponseFunc<unknown>) => {
    try {
      const { card_id } = req.body;
      const { user_id } = req.body;
      const { room_id } = req.body;

      const player_id = await Player.get({ app, db, user_id, room_id, by: 'room' });
      const already_put = await Table.alreadyPut(app, db, player_id);

      if (already_put) {
        return res.json({
          success: false,
          error: 'You have a card on the table',
        });
      }

      await Table.putCard(app, db, card_id);

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
