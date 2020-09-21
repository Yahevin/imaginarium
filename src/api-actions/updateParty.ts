import deal from "@/helpers/deal";
import {PartyAction} from "@/store/party/action";
import store from "@/store";

async function updateParty() {
    const room_id = store.getState().partyReducer.room_id;

    try {
        const {party} = await deal({
            url: '/get-players',
            method: "POST",
            body: {room_id},
        });

        store.dispatch(PartyAction.setPlayers(party));
    } catch (e) {
        console.log(e);
    }
}

export default updateParty;
