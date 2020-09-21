import store from "@/store";
import deal from "@/helpers/deal";
import {PartyAction} from "@/store/party/action";

async function updateAction() {
    try {
        const {game_action} = await deal({
            url: '/get-action',
        });

        store.dispatch(PartyAction.setGAction(game_action));
    } catch (error) {
        console.log(error)
    }
}

export default updateAction;
