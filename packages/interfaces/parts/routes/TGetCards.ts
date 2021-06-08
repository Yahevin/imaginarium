import { DB_card } from '@imaginarium/packages/interfaces';

export type TGetCards = (props: { room_id: number }) => { cards: Pick<DB_card, 'id' | 'img_url'>[] };
