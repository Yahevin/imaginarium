import { TResponseFunc } from '@my-app/types';
import { Player, Basket, Guess, Table } from '../queries';
import { authToken } from '../utils/authToken';

module.exports = (app: any, db: any) => {
  app.post('/card-guess', async (req: any, res: TResponseFunc<unknown>) => {
    try {
      const { room_id } = req.body;
      const { card_id } = req.body;
      const { user_id } = authToken(req);
      const { id: player_id } = await Player.get({ app, db, user_id, room_id, by: 'room' });
      const table_card = await Table.getCard({ app, db, player_id });
      const { basket_id } = await Basket.get({ app, db, room_id });

      if (parseInt(table_card.id) === parseInt(card_id)) {
        return res.json({
          error: 'That`s your card',
          success: false,
        });
      }

      const already_guess = await Guess.alReady({ app, db, player_id });

      if (already_guess) {
        return res.json({
          error: 'You`ve been voted',
          success: false,
        });
      }

      await Guess.make({ app, db, player_id, card_id, basket_id });

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
