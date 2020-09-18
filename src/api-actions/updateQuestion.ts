import deal from "@/helpers/deal";
import {PartyAction} from "@/store/party/action";
import store from "@/store";

async function updateQuestion() {
    const room_id = store.getState().partyReducer.room_id;

    try {
        const {question} = await deal({
            url: '/get-question',
            method: "POST",
            body: {room_id},
        });

        store.dispatch(PartyAction.setQuestion(question));
    } catch (e) {
        console.log(e);
    }
}

export default updateQuestion;
