import { ICard } from '@my-app/interfaces';

type ICardsState = {
  hand: ICard[];
  table: ICard[];
  selected: ICard['id'] | null;
};

export default ICardsState;
