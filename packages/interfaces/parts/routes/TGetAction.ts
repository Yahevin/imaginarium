import { T_GAME_ACTION } from '@imaginarium/packages/constants';

export type TGetAction = (props: { room_id: number }) => { game_action: T_GAME_ACTION };
