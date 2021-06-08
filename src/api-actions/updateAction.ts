import store from '@/store';
import deal from '@/helpers/deal';
import { PartyAction } from '@/store/party/action';
import { ROUTES } from '@imaginarium/packages/constants';
import { TGetAction } from '@imaginarium/packages/interfaces';

async function updateAction() {
  const { room_id } = store.getState().partyReducer;

  if (room_id === null) return;
  try {
    const { game_action } = await deal<TGetAction>({
      url: ROUTES.GET_ACTION,
      body: { room_id },
    });

    store.dispatch(PartyAction.setGAction(game_action));
  } catch (error) {
    console.log(error);
  }
}

export default updateAction;
