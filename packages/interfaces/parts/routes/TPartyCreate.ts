import { T_GAME_ACTION } from '@imaginarium/packages/constants';

export type TPartyCreate = () => { room_id: number; game_action: T_GAME_ACTION; game_master: boolean };
