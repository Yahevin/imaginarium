import { DB_user_room } from '@my-app/interfaces';

export type TGetPlayer = (props: { room_id: number }) => DB_user_room;
