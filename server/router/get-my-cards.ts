import { TResponseFunc } from '@my-app/types';
import { TGetMyCards, DB_card } from '@my-app/interfaces';
import { ROUTES } from '@my-app/constants';
import { Player } from '../helpers/Player';

const Cards = require('../helpers/Cards');

module.exports = (app: any, db: any) => {
  app.post(ROUTES.GET_MY_CARDS, async (req: any, res: TResponseFunc<TGetMyCards>) => {
    try {
      const { room_id } = req.body;
      const { user_id } = req.body;

      const { id } = await Player.get({ app, db, user_id, room_id, by: 'room' });
      const cards: DB_card[] = await Cards.getHand(app, db, id);

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
