import { COMMANDS, ROUTES } from '@imaginarium/packages/constants';
import { TResponseFunc, TRequest } from '@imaginarium/packages/types';
import { TPutTheCard } from '@imaginarium/packages/interfaces';
import { Player, Table } from '../queries';
import { authToken } from '../utils';
import { RoomControllersPull } from '../types';

module.exports = (app: any, db: any, roomsMap: RoomControllersPull) => {
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
      const currentParty = roomsMap.get(room_id);

      if (currentParty) {
        currentParty.maybeStartToGuess();
      } else {
        throw 'maybeStartToGuess';
      }

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
