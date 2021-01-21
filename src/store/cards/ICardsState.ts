import { ICard } from '@my-app/interfaces';

type ICardsState = {
  hand: ICard[];
  table: ICard[];
  selected: ICard['id'];
};

export default ICardsState;
