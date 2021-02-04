import { TRequest, TResponseFunc } from '@my-app/types';
import { TSetQuestion } from '@my-app/interfaces/parts/routes/TSetQuestion';
import { ROUTES } from '@my-app/constants';
import { Party } from '../helpers/Party';
import { Guess } from '../helpers/Guess';
import { authToken } from '../utils/authToken';

const Table = require('../helpers/Table');
const gameStatus = require('../mixins/gameStatus');

module.exports = (app: any, db: any) => {
  app.post(ROUTES.SET_QUESTION, async (req: TRequest<TSetQuestion>, res: TResponseFunc<TSetQuestion>) => {
    try {
      authToken(req);
      const { room_id } = req.body;
      const { card_id } = req.body;
      const { question } = req.body;

      try {
        await Guess.setQuestion({ app, db, room_id, question, card_id });
      } catch (e) {
        await Guess.createQuestion({ app, db, room_id, question, card_id });
      }
      await Table.putCard(app, db, card_id, true);
      await Party.setStatus({ app, db, room_id, game_action: gameStatus.gmCardSet });

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
