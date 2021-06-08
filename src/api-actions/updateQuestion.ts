import deal from '@/helpers/deal';
import { PartyAction } from '@/store/party/action';
import store from '@/store';
import { ROUTES } from '@imaginarium/packages/constants';
import { TGetQuestion } from '@imaginarium/packages/interfaces';

async function updateQuestion() {
  const { room_id } = store.getState().partyReducer;

  if (room_id === null) return;
  try {
    const { question } = await deal<TGetQuestion>({
      url: ROUTES.GET_QUESTION,
      body: { room_id },
    });

    store.dispatch(PartyAction.setQuestion(question));
  } catch (e) {
    console.log(e);
  }
}

export default updateQuestion;
