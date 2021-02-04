import { T_GAME_ACTION } from '@my-app/constants';

export interface DB_room {
  id: number;
  player_count: number;
  created_at: number;
  game_name: string;
  game_action: T_GAME_ACTION;
}
