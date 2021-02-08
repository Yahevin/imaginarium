import { TQuery } from '@my-app/types';
import { DB_guess, DB_question } from '@my-app/interfaces';
import { isNotEmpty, dbQuery, sqlCommands as sql } from '../../utils';

export const Guess = {
  async createQuestion({
    db,
    room_id,
    card_id = null,
    question = '',
  }: TQuery<{ room_id: number; card_id?: number | null; question?: string | '' }>) {
    const format = db.format(sql.ii3, ['question', 'room_id', 'question', 'card_id', room_id, question, card_id]);

    await dbQuery(format, db);

    return { success: true };
  },
  async setQuestion({
    db,
    room_id,
    question,
    card_id,
  }: TQuery<{ room_id: number; card_id: number; question: string }>) {
    const format = db.format(sql.ussw, ['question', 'question', question, 'card_id', card_id, 'room_id', room_id]);

    await dbQuery(format, db);

    return { success: true };
  },
  async getQuestion({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.sfw, ['question', 'room_id', room_id]);
    const results: DB_question[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results[0].question;
    }
    throw 'Question in not exist';
  },
  async clearQuestion({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.ussw, ['question', 'question', null, 'card_id', null, 'room_id', room_id]);

    await dbQuery(format, db);

    return { success: true };
  },
  async clearGuess({ db, basket_id }: TQuery<{ basket_id: number }>) {
    const format = db.format(sql.dfw, ['guess', 'basket_id', basket_id]);
    const results: DB_guess[] = await dbQuery(format, db);

    return isNotEmpty(results);
  },
  async make({ db, player_id, card_id, basket_id }: TQuery<{ player_id: number; card_id: number; basket_id: number }>) {
    const format = db.format(sql.ii3, ['guess', 'player_id', 'card_id', 'basket_id', player_id, card_id, basket_id]);

    await dbQuery(format, db);

    return { success: true };
  },
  async getVoteList({ db, players_id_list }: TQuery<{ players_id_list: number[] }>) {
    const format = db.format(sql.sfwi, ['guess', 'player_id', players_id_list]);
    const results: DB_guess[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'Nobody had voted';
  },
  async alReady({ db, player_id }: TQuery<{ player_id: number }>) {
    const format = db.format(sql.sfw, ['guess', 'player_id', player_id]);
    const results: DB_guess[] = await dbQuery(format, db);

    return isNotEmpty(results);
  },
};
