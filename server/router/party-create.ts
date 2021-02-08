import { TPartyCreate, DB_shelter } from '@my-app/interfaces';
import { TRequest, TResponseFunc } from '@my-app/types';
import { GAME_ACTION, ROUTES } from '@my-app/constants';
import { Party, Basket, Cards, Guess } from '../queries';
import { authToken } from '../utils';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.PARTY_CREATE, async (req: TRequest<TPartyCreate>, res: TResponseFunc<TPartyCreate>) => {
    try {
      const { user_id } = authToken(req);
      const room_id = await Party.create({ app, db });
      const { basket_id } = await Basket.create({ app, db, room_id });

      await Party.addPlayer({ app, db, user_id, room_id, game_master: true });
      await Guess.createQuestion({ app, db, room_id });

      const new_cards: DB_shelter[] = await Cards.getCardShelter(db);

      await Cards.createPool({ app, db, new_cards, basket_id });

      return res.json({
        success: true,
        room_id,
        game_master: true,
        game_action: GAME_ACTION.START,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
