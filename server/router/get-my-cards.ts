import { TResponseFunc, TRequest } from '@my-app/types';
import { TGetCards, DB_card } from '@my-app/interfaces';
import { ROUTES } from '@my-app/constants';
import { Player, Cards } from '../queries';
import { authToken } from '../utils';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.GET_MY_CARDS, async (req: TRequest<TGetCards>, res: TResponseFunc<TGetCards>) => {
    try {
      const { user_id } = authToken(req);
      const { room_id } = req.body;

      const { id: player_id } = await Player.get({ app, db, user_id, room_id, by: 'room' });
      const cards: DB_card[] = await Cards.getHand({ app, db, player_id });

      res.json({
        success: true,
        cards: cards.map((card) => {
          return {
            id: card.id,
            img_url: card.img_url,
          };
        }),
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
