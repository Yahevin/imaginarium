import deal from '@/helpers/deal';
import { PartyAction } from '@/store/party/action';
import store from '@/store';
import { ROUTES } from '@my-app/constants';
import { TGetPlayers } from '@my-app/interfaces';

async function updateParty() {
  try {
    const { party } = await deal<TGetPlayers>({
      url: ROUTES.GET_PLAYERS,
    });

    store.dispatch(PartyAction.setPlayers(party));
  } catch (e) {
    console.log(e);
  }
}

export default updateParty;
