import { DB_card } from '@my-app/interfaces';

export type TGetMyCards = (props: { room_id: number }) =>  { cards: Pick<DB_card, 'id' | 'img_url'>[] };
