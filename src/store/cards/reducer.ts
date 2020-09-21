import CardsState from "@/store/cards/state";
import ICardsState from "@/store/cards/ICardsState";
import {CardsActionTypes} from "@/store/cards/action";
import {SET_HAND_CARDS, SET_SELECTED} from "@/store/actions";


function cardsReducer(state = CardsState, action: CardsActionTypes) : ICardsState {
    switch (action.type) {
        case SET_HAND_CARDS: {
            return {
                ...state,
                hand: action.payload
            }
        }
        case SET_SELECTED: {
            return {
                ...state,
                selected: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default cardsReducer;
