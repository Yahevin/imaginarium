import deal from '@/helpers/deal';
import { PartyAction } from '@/store/party/action';
import store from '@/store';
import { ROUTES } from '@my-app/constants';
import { DB_user_room } from '@my-app/interfaces';

async function updateRole() {
  try {
    const { game_master } = await deal<DB_user_room>({
      url: ROUTES.USER_ROOM,
    });

    store.dispatch(PartyAction.setGameRole(game_master));
  } catch (e) {
    console.log(e);
  }
}

export default updateRole;
