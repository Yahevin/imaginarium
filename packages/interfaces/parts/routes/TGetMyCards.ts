import { DB_card } from '@my-app/interfaces';

export type TGetMyCards = { cards: Pick<DB_card, 'id' | 'img_url'>[] };
