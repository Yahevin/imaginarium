import deal from '@/helpers/deal';
import { PartyAction } from '@/store/party/action';
import store from '@/store';
import { ROUTES } from '@imaginarium/packages/constants';
import { TGetPlayer } from '@imaginarium/packages/interfaces';

async function updateRole() {
  const { room_id } = store.getState().partyReducer;

  if (room_id === null) return;
  try {
    const { game_master } = await deal<TGetPlayer>({
      url: ROUTES.GET_PLAYER,
      body: { room_id },
    });

    store.dispatch(PartyAction.setGameRole(game_master));
  } catch (e) {
    console.log(e);
  }
}

export default updateRole;
