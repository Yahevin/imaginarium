import { DB_user } from '@imaginarium/packages/interfaces';

export type TLeaderBoard = (props: { room_id: number }) => { users: DB_user[] };
