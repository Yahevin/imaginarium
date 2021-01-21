import deal from '@/helpers/deal';
import { PartyAction } from '@/store/party/action';
import store from '@/store';

async function updateParty() {
  try {
    const { party } = await deal({
      url: '/get-players',
    });

    store.dispatch(PartyAction.setPlayers(party));
  } catch (e) {
    console.log(e);
  }
}

export default updateParty;
