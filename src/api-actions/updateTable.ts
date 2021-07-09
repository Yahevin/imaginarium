import store from '@/store';
import deal from '@/helpers/deal';
import { CardsAction } from '@/store/cards/action';
import { ROUTES } from '@imaginarium/packages/constants';
import { TGetCards } from '@imaginarium/packages/interfaces';

async function updateTable() {
  const { room_id } = store.getState().partyReducer;

  if (room_id === null) return;
  try {
    const { cards } = await deal<TGetCards>({
      url: ROUTES.GET_TABLE_CARDS,
      body: { room_id },
    });

    store.dispatch(CardsAction.setTable(cards));
  } catch (error) {
    console.log(error);
  }
}

export default updateTable;
