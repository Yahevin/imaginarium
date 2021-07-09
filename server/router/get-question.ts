import { TRequest, TResponseFunc } from '@imaginarium/packages/types';
import { TGetQuestion } from '@imaginarium/packages/interfaces';
import { ROUTES } from '@imaginarium/packages/constants';
import { Guess } from '../queries';
import { authToken } from '../utils';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.GET_QUESTION, async (req: TRequest<TGetQuestion>, res: TResponseFunc<TGetQuestion>) => {
    try {
      authToken(req);
      const { room_id } = req.body;
      const question = await Guess.getQuestion({ app, db, room_id });

      return res.json({
        success: true,
        question,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
