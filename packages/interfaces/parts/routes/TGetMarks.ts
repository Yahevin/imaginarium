import { DB_guess } from '@my-app/interfaces';

export type TGetMarks = (props: { room_id: number }) => Pick<DB_guess, 'card_id' | 'player_id'>;
