import { ICard } from '@my-app/interfaces';
import {
  PUT_TO_TABLE,
  SET_HAND_CARDS,
  SET_SELECTED_HAND,
  SET_TABLE_CARDS,
  DROP_SELECTED,
  LEAVE_PARTY,
} from '@/store/actions';
import { InferValueTypes } from '@my-app/types';

const CardsAction = {
  setHand(hand_cards: ICard[]) {
    return {
      type: SET_HAND_CARDS,
      payload: hand_cards,
    };
  },
  setSelectedHand(card_id: ICard['id']) {
    return {
      type: SET_SELECTED_HAND,
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
  dropSelected() {
    return {
      type: DROP_SELECTED,
    };
  },
  leave() {
    return {
      type: LEAVE_PARTY,
    };
  },
};

type CardsActionTypes = ReturnType<InferValueTypes<typeof CardsAction>>;

export { CardsAction, CardsActionTypes };
