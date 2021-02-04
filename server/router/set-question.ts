import { TRequest, TResponseFunc } from '@my-app/types';
import { TSetQuestion } from '@my-app/interfaces/parts/routes/TSetQuestion';
import { GAME_ACTION, ROUTES } from '@my-app/constants';
import { Party, Guess, Table } from '../queries';
import { authToken } from '../utils';

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
      await Table.putCard({ app, db, card_id, is_main: true });
      await Party.setStatus({ app, db, room_id, game_action: GAME_ACTION.GM_CARD_SET });

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
