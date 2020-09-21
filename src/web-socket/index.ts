import updateParty from "@/api-actions/updateParty";
import updateRole from "@/api-actions/updateRole";
import updateHand from "@/api-actions/updateHand";
import store from "@/store";
import {PartyAction} from "@/store/party/action";
import GAME_ACTION from "@/constants/GAME_ACTION";

const socket = new WebSocket('ws://localhost:8000');

socket.onopen = function(event) {
    console.log("[open] Соединение установлено");
};

socket.onmessage = function(event) {
    const message = JSON.parse(event.data);

    switch (message.type) {
        case 'UPDATE_PARTY': {
            console.log('[message] UPDATE_PARTY');
            return updateParty();
        }
        case 'UPDATE_ROLE': {
            console.log('[message] UPDATE_ROLE');
            return updateRole();
        }
        case 'UPDATE_HAND': {
            console.log('[message] UPDATE_HAND');
            return updateHand();
        }
        case 'SET_QUESTION': {
            store.dispatch(PartyAction.setQuestion(message.payload));
            store.dispatch(PartyAction.setGAction(GAME_ACTION.gmCardSet));
            return
        }
        default: {
            console.log(`[message] Данные получены с сервера: ${event.data}`);
        }
    }
};

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
        console.log('[close] Соединение прервано');
    }
};

socket.onerror = function(error) {
    console.log(error);
};

export default socket;
