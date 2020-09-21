import store from "@/store";
import deal from "@/helpers/deal";
import {CardsAction} from "@/store/cards/action";

async function updateHand() {
    const room_id = store.getState().partyReducer.room_id;
    const user_id = store.getState().userReducer.user_id;
    const hand_cards = store.getState().cardsReducer.hand;

    try {
        let resp = await deal({
            url: '/get-my-cards',
            method: "POST",
            body: {room_id, user_id},
        });

        if((hand_cards.length + resp.cards.length) < 6) {
            resp = await deal({
                url: '/get-new-cards',
                method: "POST",
                body: {room_id, user_id},
            });
        }

        store.dispatch(CardsAction.setHand(resp.cards));
    } catch (e) {
        console.log(e);
    }
}

export default updateHand;
