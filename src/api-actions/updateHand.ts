import store from "@/store";
import deal from "@/helpers/deal";
import {CardsAction} from "@/store/cards/action";
import GAME_ACTION from "@/constants/GAME_ACTION";

async function updateHand() {
    const hand_cards = store.getState().cardsReducer.hand;
    const game_action = store.getState().partyReducer.game_action;

    try {
        const {cards} = await deal({
            url: '/get-my-cards',
        });

        if((hand_cards.length + cards.length) < 6
            && game_action === GAME_ACTION.start) {
            await getNew();
        } else {
            store.dispatch(CardsAction.setHand(cards));
        }
    } catch (e) {
        console.log(e);

        // TODO something with it
        await getNew();
    }
}

async function getNew() {
    const {cards} = await deal({
        url: '/get-new-cards',
    });

    store.dispatch(CardsAction.setHand(cards));
}

export default updateHand;
