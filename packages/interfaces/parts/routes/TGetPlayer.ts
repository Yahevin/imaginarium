import { DB_user_room } from '@imaginarium/packages/interfaces';

export type TGetPlayer = (props: { room_id: number }) => DB_user_room;
