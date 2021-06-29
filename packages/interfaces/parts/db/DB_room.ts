import { T_GAME_ACTION } from '@imaginarium/packages/constants';

export interface DB_room {
  id: number;
  created_at: string;
  game_name: string;
  game_action: T_GAME_ACTION;
}
