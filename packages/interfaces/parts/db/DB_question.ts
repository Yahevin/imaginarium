import { DB_card, DB_room } from '@imaginarium/packages/interfaces';

export interface DB_question {
  id: number;
  question: string;
  card_id: DB_card['id'];
  room_id: DB_room['id'];
}
