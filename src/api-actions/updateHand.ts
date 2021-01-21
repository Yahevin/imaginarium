import store from '@/store';
import deal from '@/helpers/deal';
import { CardsAction } from '@/store/cards/action';
import { GAME_ACTION } from '@my-app/constants';
import { MAX_HAND_CARDS } from '@my-app/constants/parts/MAX_HAND_CARDS';

async function getNew() {
  const hand_cards = store.getState().cardsReducer.hand;

  try {
    const { cards } = await deal({
      url: '/get-new-cards',
    });

    store.dispatch(CardsAction.setHand([...cards, ...hand_cards]));
  } catch (error) {
    console.log(error);
  }
}

async function updateHand() {
  const { game_action } = store.getState().partyReducer;

  try {
    const { cards } = await deal({
      url: '/get-my-cards',
    });

    store.dispatch(CardsAction.setHand(cards));

    if (cards.length < MAX_HAND_CARDS && game_action === GAME_ACTION.START) {
      await getNew();
    }
  } catch (e) {
    await getNew();
  }
}

export default updateHand;
