import { TPartyCreate, DB_shelter } from '@my-app/interfaces';
import { TRequest, TResponseFunc } from '@my-app/types';
import { ROUTES } from '@my-app/constants';
import { authToken } from '../utils/authToken';
import { Party } from '../helpers/Party';

const cardStatus = require('../mixins/cardStatus');
const gameSt = require('../mixins/gameStatus');
const Basket = require('../helpers/Basket');
const Cards = require('../helpers/Cards');
const Guess = require('../helpers/Guess');

module.exports = (app: any, db: any) => {
  app.post(ROUTES.PARTY_CREATE, async (req: TRequest<TPartyCreate>, res: TResponseFunc<TPartyCreate>) => {
    try {
      const { user_id } = authToken(req);
      const room_id = await Party.create({ app, db });
      await Party.addPlayer({ app, db, user_id, room_id, game_master: true });
      await Guess.createQuestion(app, db, room_id);
      const basket_id = await Basket.create(app, db, room_id);
      const pure_cards: DB_shelter[] = await Cards.getCardShelter(app, db);
      const new_cards = pure_cards.map((card) => {
        return [card.img_url, card.id, basket_id, cardStatus.new];
      });
      await Cards.createPool(app, db, new_cards);

      return res.json({
        success: true,
        room_id,
        game_master: true,
        game_action: gameSt.prepare,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
