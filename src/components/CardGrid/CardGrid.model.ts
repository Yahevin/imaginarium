import { ICard } from '@my-app/interfaces';

export type TCardGrid = {
  cards: ICard[];
  selected_id: ICard['id'] | null;
  setSelect: (card_id: ICard['id']) => void;
};
