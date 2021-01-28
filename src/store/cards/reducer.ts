import CardsState from '@/store/cards/state';
import ICardsState from '@/store/cards/ICardsState';
import { CardsActionTypes } from '@/store/cards/action';
import {
  DROP_SELECTED,
  PUT_TO_TABLE,
  SET_HAND_CARDS,
  SET_SELECTED_HAND,
  SET_TABLE_CARDS
} from '@/store/actions';

function cardsReducer(state = CardsState, action: CardsActionTypes): ICardsState {
  switch (action.type) {
    case SET_HAND_CARDS: {
      return {
        ...state,
        hand: action.payload,
      };
    }
    case SET_SELECTED_HAND: {
      return {
        ...state,
        selectedHand: action.payload,
      };
    }
    case PUT_TO_TABLE: {
      return {
        ...state,
        hand: state.hand.filter((card) => {
          return card.id !== action.payload;
        }),
        selectedHand: null,
      };
    }
    case SET_TABLE_CARDS: {
      return {
        ...state,
        table: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default cardsReducer;
