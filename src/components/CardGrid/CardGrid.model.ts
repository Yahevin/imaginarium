import { ICard } from '@my-app/interfaces';

export type TCardGrid = {
  cards: ICard[];
  select: (card_id: ICard['id']) => void;
};
