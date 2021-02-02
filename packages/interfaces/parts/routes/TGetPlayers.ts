import { MergeTypes } from '@my-app/types';
import { DB_user, DB_user_room } from '@my-app/interfaces';

export type TGetPlayers = {
  party: MergeTypes<Pick<DB_user_room, 'id' | 'score' | 'game_master'>, Pick<DB_user, 'nick_name' | 'experience'>>[];
};
