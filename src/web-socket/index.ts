import updateParty from "@/api-actions/updateParty";
import updateRole from "@/api-actions/updateRole";
import updateHand from "@/api-actions/updateHand";
import store from "@/store";
import {PartyAction} from "@/store/party/action";
import {GAME_ACTION} from "@my-app/constants";
import {COMMANDS} from "@my-app/commands/index";
import updateAction from "@/api-actions/updateAction";
import updateTable from "@/api-actions/updateTable";

const socket = new WebSocket('ws://localhost:8000');

socket.onopen = function(event) {
    console.log("[open] Соединение установлено");
};

socket.onmessage = async function(event) {
    const message = JSON.parse(event.data);

    switch (message.type) {
        case COMMANDS.UPDATE_PARTY: {
            console.log('[message] UPDATE_PARTY');
            return updateParty();
        }
        case COMMANDS.UPDATE_ROLE: {
            console.log('[message] UPDATE_ROLE');
            return updateRole();
        }
        case COMMANDS.UPDATE_HAND: {
            console.log('[message] UPDATE_HAND');
            return updateHand();
        }
        case COMMANDS.UPDATE_ACTION: {
            console.log('[message] UPDATE_ACTION');
            return updateAction();
        }
        case COMMANDS.UPDATE_ALL: {
            console.log('[message] UPDATE_ALL');
            await updateAction();
            updateParty();
            updateHand();
            updateRole();
            break;
        }
        case COMMANDS.UPDATE_QUESTION: {
            console.log('[message] UPDATE_QUESTION');
            store.dispatch(PartyAction.setQuestion(message.payload));
            store.dispatch(PartyAction.setGAction(GAME_ACTION.gmCardSet));
            break;
        }
        case COMMANDS.START_GUESS: {
            console.log('[message] START_GUESS');
            updateTable();
            store.dispatch(PartyAction.setGAction(GAME_ACTION.allCardSet));
            break;
        }
        case COMMANDS.SHOW_SCORE: {
            console.log('[message] SHOW_SCORE');
            updateParty();
            store.dispatch(PartyAction.setGAction(GAME_ACTION.allGuessDone));
            break;
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
