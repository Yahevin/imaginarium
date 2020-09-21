import ICard from "@/interfaces/ICard";
import {PUT_TO_TABLE, SET_HAND_CARDS, SET_SELECTED} from "@/store/actions";
import InferValueTypes from "@/types/InferValueTypes";

const CardsAction = {
    setHand: function(hand_cards: ICard[]) {
        return {
            type: SET_HAND_CARDS,
            payload: hand_cards
        }
    },
    setSelected: function (card_id: ICard['id']) {
        return {
            type: SET_SELECTED,
            payload: card_id
        }
    },
    putToTable: function (card_id: ICard['id']) {
        return {
            type: PUT_TO_TABLE,
            payload: card_id
        }
    }
};

type CardsActionTypes = ReturnType<InferValueTypes<typeof CardsAction>>;


export {CardsAction, CardsActionTypes};
