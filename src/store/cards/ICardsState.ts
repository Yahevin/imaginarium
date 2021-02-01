import { ICard } from '@my-app/interfaces';

type ICardsState = {
  hand: ICard[];
  table: ICard[];
  selectedHand: ICard['id'] | null;
};

export default ICardsState;
