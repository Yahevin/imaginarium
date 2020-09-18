import store from "@/store";
import deal from "@/helpers/deal";
import {CardsAction} from "@/store/cards/action";

async function updateHand() {
    const room_id = store.getState().partyReducer.room_id;
    const user_id = store.getState().userReducer.user_id;

    try {
        const {cards} = await deal({
            url: '/get-my-cards',
            method: "POST",
            body: {room_id, user_id},
        });

        store.dispatch(CardsAction.setHand(cards));
    } catch (e) {
        console.log(e);
    }
}

export default updateHand;
