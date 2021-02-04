import { TQuery } from '@my-app/types';
import { DB_card, DB_shelter } from '@my-app/interfaces';
import { isNotEmpty } from '../mixins/isNotEmpty';

const sql = require('../mixins/sqlCommands');
const cardStatus = require('../mixins/cardStatus');
const dbQuery = require('../mixins/dbQuery');

export const Cards = {
  async getExistingCards({ db, players_id_list }: TQuery<{ players_id_list: number[] }>) {
    const format = db.format(sql.sfwi, ['cards', 'player_id', players_id_list]);
    const results: DB_card[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'The getExistingCards failed. There is no cards in his hand';
  },
  async getCardShelter(db: any) {
    const format = db.format(sql.sf, ['shelter']);
    const results: DB_card[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'Cards are lost';
  },
  async getNew({ db, basket_id }: TQuery<{ basket_id: number }>) {
    const format = db.format(sql.sfww, ['card', 'basket_id', basket_id, 'status', cardStatus.new]);
    const results: DB_card[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'The getNew failed. There is no new cards ready';
  },
  async getHand({ db, player_id }: TQuery<{ player_id: number }>) {
    const format = db.format(sql.sfww, ['card', 'player_id', player_id, 'status', cardStatus.hand]);
    const results: DB_card[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'The getCards failed. There is no cards in his hand';
  },
  async getAllMy({ db, player_id }: TQuery<{ player_id: number }>) {
    const format: DB_card[] = db.format(sql.sfwwi, [
      'card',
      'player_id',
      player_id,
      'status',
      [cardStatus.hand, cardStatus.table],
    ]);
    return await dbQuery(format, db);
  },
  async moveToBasket({ db, basket_id }: TQuery<{ basket_id: number }>) {
    const format = db.format(sql.usww, [
      'card',
      'status',
      cardStatus.basket,
      'basket_id',
      basket_id,
      'status',
      cardStatus.table,
    ]);
    await dbQuery(format, db);

    return { success: true };
  },
  async mixBasket({ db, basket_id }: TQuery<{ basket_id: number }>) {
    const format = db.format(sql.usww, [
      'card',
      'status',
      cardStatus.new,
      'basket_id',
      basket_id,
      'status',
      cardStatus.basket,
    ]);
    await dbQuery(format, db);

    return { success: true };
  },
  async noteTaken({ db, player_id, cards_id_list }: TQuery<{ player_id: number; cards_id_list: number[] }>) {
    const format = db.format(sql.usswi, [
      'card',
      'status',
      cardStatus.hand,
      'player_id',
      player_id,
      'id',
      cards_id_list,
    ]);
    await dbQuery(format, db);

    return { success: true };
  },
  async createPool({ db, new_cards, basket_id }: TQuery<{ new_cards: DB_shelter[]; basket_id: number }>) {
    const insertArray = new_cards.map((card) => [card.img_url, card.id, basket_id, cardStatus.new]);
    const format = db.format(sql.im4, ['card', 'img_url', 'origin_id', 'basket_id', 'status', insertArray]);

    await dbQuery(format, db);

    return { success: true };
  },
};
