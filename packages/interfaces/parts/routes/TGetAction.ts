import { T_GAME_ACTION } from '@my-app/constants';

export type TGetAction = (props: { room_id: number }) => { game_action: T_GAME_ACTION };
