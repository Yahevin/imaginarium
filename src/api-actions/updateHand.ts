import store from "@/store";
import deal from "@/helpers/deal";
import {CardsAction} from "@/store/cards/action";
import GAME_ACTION from "@/constants/GAME_ACTION";

async function updateHand() {
    const game_action = store.getState().partyReducer.game_action;

    try {
        const {cards} = await deal({
            url: '/get-my-cards',
        });

        store.dispatch(CardsAction.setHand(cards));

        if (cards.length < 6 && game_action === GAME_ACTION.start) {
            await getNew();
        }
    } catch (e) {
        await getNew();
    }
}

async function getNew() {
    const hand_cards = store.getState().cardsReducer.hand;

    try {
        const {cards} = await deal({
            url: '/get-new-cards',
        });

        store.dispatch(CardsAction.setHand([
            ...cards,
            ...hand_cards
        ]));
    } catch (error) {
        console.log(error);
    }
}

export default updateHand;
