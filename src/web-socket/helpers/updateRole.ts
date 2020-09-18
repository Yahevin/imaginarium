import deal from "@/helpers/deal";
import {PartyAction} from "@/store/party/action";
import store from "@/store";

async function updateRole() {
    const room_id = store.getState().partyReducer.room_id;
    const user_id = store.getState().userReducer.user_id;

    try {
        const {game_master} = await deal({
            url: '/get-role',
            method: "POST",
            body: {room_id, user_id},
        });

        store.dispatch(PartyAction.setGameRole(game_master));
    } catch (e) {
        console.log(e);
    }
}

export default updateRole;
