import { ROUTES } from '@imaginarium/packages/constants';
import { TRequest, TResponseFunc } from '@imaginarium/packages/types';

import { TGetMarks } from '@imaginarium/packages/interfaces';
import { Party, Guess } from '../queries';
import { authToken } from '../utils';

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
        // @ts-ignore
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
