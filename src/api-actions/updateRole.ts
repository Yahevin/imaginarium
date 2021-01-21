import deal from '@/helpers/deal';
import { PartyAction } from '@/store/party/action';
import store from '@/store';

async function updateRole() {
  try {
    const { game_master } = await deal({
      url: '/get-role',
    });

    store.dispatch(PartyAction.setGameRole(game_master));
  } catch (e) {
    console.log(e);
  }
}

export default updateRole;
