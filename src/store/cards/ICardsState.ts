import { ICard } from '@imaginarium/packages/interfaces';

type ICardsState = {
  hand: ICard[];
  table: ICard[];
  selectedHand: ICard['id'] | null;
};

export default ICardsState;
