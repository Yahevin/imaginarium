import store from '@/store';
import deal from '@/helpers/deal';
import { CardsAction } from '@/store/cards/action';

async function updateTable() {
  try {
    const { cards } = await deal({
      url: '/get-table-cards',
    });

    store.dispatch(CardsAction.setTable(cards));
  } catch (error) {
    console.log(error);
  }
}

export default updateTable;
