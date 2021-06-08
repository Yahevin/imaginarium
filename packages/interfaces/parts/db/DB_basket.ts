import { DB_room } from '@imaginarium/packages/interfaces';

export interface DB_basket {
  id: number;
  room_id: DB_room['id'];
}
