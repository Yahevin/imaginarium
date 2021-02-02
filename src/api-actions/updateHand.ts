import store from '@/store';
import deal from '@/helpers/deal';
import { CardsAction } from '@/store/cards/action';
import { GAME_ACTION, ROUTES } from '@my-app/constants';
import { MAX_HAND_CARDS } from '@my-app/constants/parts/MAX_HAND_CARDS';
import { TGetMyCards } from '@my-app/interfaces/parts/routes/TGetMyCards';

async function getNew() {
  const hand_cards = store.getState().cardsReducer.hand;

  try {
    const { cards } = await deal<TGetMyCards>({
      url: ROUTES.GET_NEW_CARDS,
    });

    store.dispatch(CardsAction.setHand([...cards, ...hand_cards]));
  } catch (error) {
    console.log(error);
  }
}

async function updateHand() {
  const { game_action } = store.getState().partyReducer;

  try {
    const { cards } = await deal<TGetMyCards>({
      url: ROUTES.GET_MY_CARDS,
    });

    store.dispatch(CardsAction.setHand(cards));

    if (cards.length < MAX_HAND_CARDS && game_action === GAME_ACTION.START) {
      // await getNew();
    }
  } catch (e) {
    // await getNew();
  }
}

export default updateHand;
