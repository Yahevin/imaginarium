import store from "@/store";
import deal from "@/helpers/deal";
import {CardsAction} from "@/store/cards/action";

async function updateHand() {
    const hand_cards = store.getState().cardsReducer.hand;

    try {
        let resp = await deal({
            url: '/get-my-cards',
        });

        if((hand_cards.length + resp.cards.length) < 6) {
            resp = await deal({
                url: '/get-new-cards',
            });
        }

        store.dispatch(CardsAction.setHand(resp.cards));
    } catch (e) {
        console.log(e);
    }
}

export default updateHand;
