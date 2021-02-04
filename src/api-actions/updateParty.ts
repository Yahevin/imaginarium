import deal from '@/helpers/deal';
import { PartyAction } from '@/store/party/action';
import store from '@/store';
import { ROUTES } from '@my-app/constants';
import { TGetPlayers } from '@my-app/interfaces';

async function updateParty() {
  const { room_id } = store.getState().partyReducer;

  if (room_id === null) return;
  try {
    const { party } = await deal<TGetPlayers>({
      url: ROUTES.GET_PLAYERS,
      body: { room_id },
    });

    store.dispatch(PartyAction.setPlayers(party));
  } catch (e) {
    console.log(e);
  }
}

export default updateParty;
