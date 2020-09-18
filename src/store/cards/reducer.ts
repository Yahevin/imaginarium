import CardsState from "@/store/cards/state";
import ICardsState from "@/store/cards/ICardsState";
import {CardsActionTypes} from "@/store/cards/action";
import {SET_HAND_CARDS} from "@/store/actions";


function cardsReducer(state = CardsState, action: CardsActionTypes) : ICardsState {
    switch (action.type) {
        case SET_HAND_CARDS: {
            return {
                ...state,
                hand: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default cardsReducer;
