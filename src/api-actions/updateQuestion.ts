import deal from '@/helpers/deal';
import { PartyAction } from '@/store/party/action';
import store from '@/store';

async function updateQuestion() {
  try {
    const { question } = await deal({
      url: '/get-question',
    });

    store.dispatch(PartyAction.setQuestion(question));
  } catch (e) {
    console.log(e);
  }
}

export default updateQuestion;
