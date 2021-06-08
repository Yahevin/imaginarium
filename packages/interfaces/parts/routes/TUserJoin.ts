import { T_GAME_ACTION } from '@imaginarium/packages/constants';

export type TUserJoin = (props: { room_id: number }) => { game_action: T_GAME_ACTION; game_master: boolean };
