import ICard from "@/interfaces/ICard";
import {SET_HAND_CARDS} from "@/store/actions";
import InferValueTypes from "@/types/InferValueTypes";

const CardsAction = {
    setHand: function(props: ICard[]) {
        return {
            type: SET_HAND_CARDS,
            payload: props
        }
    }
};

type CardsActionTypes = ReturnType<InferValueTypes<typeof CardsAction>>;


export {CardsAction, CardsActionTypes};
