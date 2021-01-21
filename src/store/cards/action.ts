import { ICard } from '@my-app/interfaces';
import { PUT_TO_TABLE, SET_HAND_CARDS, SET_SELECTED, SET_TABLE_CARDS } from '@/store/actions';
import { InferValueTypes } from '@my-app/types';

const CardsAction = {
  setHand(hand_cards: ICard[]) {
    return {
      type: SET_HAND_CARDS,
      payload: hand_cards,
    };
  },
  setSelected(card_id: ICard['id']) {
    return {
      type: SET_SELECTED,
      payload: card_id,
    };
  },
  putToTable(card_id: ICard['id']) {
    return {
      type: PUT_TO_TABLE,
      payload: card_id,
    };
  },
  setTable(cards: ICard[]) {
    return {
      type: SET_TABLE_CARDS,
      payload: cards,
    };
  },
};

type CardsActionTypes = ReturnType<InferValueTypes<typeof CardsAction>>;

export { CardsAction, CardsActionTypes };
