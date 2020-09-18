import updateParty from "@/helpers/updateParty";

const socket = new WebSocket('ws://localhost:8000');

socket.onopen = function(event) {
    console.log("[open] Соединение установлено");
};

socket.onmessage = function(event) {
    switch (event.data) {
        case 'UPDATE_PARTY': {
            console.log('[message] UPDATE_PARTY');
            updateParty();
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
