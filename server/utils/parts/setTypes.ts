/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */

import {
  DB_basket,
  DB_card,
  DB_guess,
  DB_question,
  DB_room,
  DB_shelter,
  DB_user,
  DB_user_room,
} from '@imaginarium/packages/interfaces';

export const setTypes = (res: any) => {
  if (Array.isArray(res)) {
    return res.map(unitFix);
  }
  return unitFix(res);
};

const unitFix = (obj: DB_basket | DB_card | DB_guess | DB_question | DB_room | DB_shelter | DB_user | DB_user_room) => {
  if (obj.hasOwnProperty('id')) {
    obj.id = parseInt(obj.id as unknown as string);
  }
  if (obj.hasOwnProperty('user_id') && 'user_id' in obj) {
    obj.user_id = parseInt(obj.user_id as unknown as string);
  }
  if (obj.hasOwnProperty('room_id') && 'room_id' in obj) {
    obj.room_id = parseInt(obj.room_id as unknown as string);
  }
  if (obj.hasOwnProperty('score') && 'score' in obj) {
    obj.score = parseInt(obj.score as unknown as string);
  }
  if (obj.hasOwnProperty('card_id') && 'card_id' in obj) {
    obj.card_id = parseInt(obj.card_id as unknown as string);
  }
  if (obj.hasOwnProperty('player_id') && 'player_id' in obj) {
    obj.player_id = parseInt(obj.player_id as unknown as string);
  }
  if (obj.hasOwnProperty('basket_id') && 'basket_id' in obj) {
    obj.basket_id = parseInt(obj.basket_id as unknown as string);
  }
  if (obj.hasOwnProperty('origin_id') && 'origin_id' in obj) {
    obj.origin_id = parseInt(obj.origin_id as unknown as string);
  }
  if (obj.hasOwnProperty('game_master') && 'game_master' in obj) {
    obj.game_master = Boolean(obj.game_master as unknown as string);
  }

  return obj;
};
