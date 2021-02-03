import { DB_user } from '@my-app/interfaces';

export type TLeaderBoard = (props: { room_id: number }) => { users: DB_user[] };
