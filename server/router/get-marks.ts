import { ROUTES } from '@my-app/constants';
import { TRequest } from '@my-app/types/parts/TRequest';
import { TResponseFunc } from '@my-app/types';
import { TGetMarks } from '@my-app/interfaces/parts/routes/TGetMarks';
import { Party } from '../helpers/Party';
import { authToken } from '../utils/authToken';

const Guess = require('../helpers/Guess');

module.exports = (app: any, db: any) => {
  app.get(ROUTES.GET_MARKS, async (req: TRequest<TGetMarks>, res: TResponseFunc<TGetMarks>) => {
    async function getUsersId() {
      try {
        authToken(req);
        const { room_id } = req.body;

        const results = await Party.getPlayersList({ app, db, room_id });

        return results.map((item) => {
          return item.user_id;
        });
      } catch (error) {
        return res.json({
          success: false,
          error,
        });
      }
    }
    async function getMembersGuess(membersId: number[]) {
      try {
        return await Guess.getByUsersId(app, db, membersId);
      } catch (error) {
        return res.json({
          success: false,
          error,
        });
      }
    }

    const membersId = (await getUsersId()) as number[];
    const guesses = await getMembersGuess(membersId);

    res.json(guesses);
  });
};
