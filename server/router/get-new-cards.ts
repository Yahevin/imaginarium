/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-magic-numbers */
import { TRequest, TResponseFunc } from '@my-app/types';
import { ROUTES } from '@my-app/constants';
import { DB_card, TGetCards } from '../../packages/interfaces';
import { Player, Basket, Cards } from '../queries';
import { authToken } from '../utils/authToken';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.GET_MY_CARDS, async (req: TRequest<TGetCards>, res: TResponseFunc<TGetCards>) => {
    try {
      const { user_id } = authToken(req);
      const { room_id } = req.body;

      const { id: player_id } = await Player.get({ app, db, user_id, room_id, by: 'room' });
      const { basket_id } = await Basket.get({ app, db, room_id });
      const my_cards = await Cards.getAllMy({ app, db, player_id });
      let new_cards: DB_card[] = await Cards.getNew({ app, db, basket_id });
      const deficit = 6 - my_cards.length;

      if (new_cards.length < deficit) {
        await Cards.mixBasket({ app, db, basket_id });
        new_cards = await Cards.getNew({ app, db, basket_id });
      }

      const { selected_id_list, selected_cards } = getSelected(new_cards, deficit);

      await Cards.noteTaken({ app, db, player_id, cards_id_list: selected_id_list });

      return res.json({
        success: true,
        cards: selected_cards.map((card) => {
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

function getSelected(new_cards: DB_card[], deficit: number) {
  const selected_id_list: number[] = [];
  const selected_cards: DB_card[] = [];

  for (let i = 0; i < deficit; i++) {
    const index = Math.floor(new_cards.length * Math.random());
    const randomItem = new_cards[index];

    if (selected_id_list.includes(randomItem.id)) {
      i--;
    } else {
      selected_id_list.push(randomItem.id);
      selected_cards.push(randomItem);
    }
  }

  if (selected_cards.length === 0) throw 'New cards not collected';

  return { selected_cards, selected_id_list };
}
