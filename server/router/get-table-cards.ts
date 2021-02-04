import { ROUTES } from '@my-app/constants';
import { TRequest } from '@my-app/types/parts/TRequest';
import { TResponseFunc } from '@my-app/types';
import { TGetCards } from '@my-app/interfaces/parts/routes/TGetCards';
import { DB_card } from '@my-app/interfaces';
import { Basket, Table } from '../queries';
import { authToken } from '../utils';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.GET_TABLE_CARDS, async (req: TRequest<TGetCards>, res: TResponseFunc<TGetCards>) => {
    try {
      authToken(req);
      const { room_id } = req.body;
      const { basket_id } = await Basket.get({ app, db, room_id });
      const cards: DB_card[] = await Table.getCardsList({ app, db, basket_id });

      return res.json({
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
