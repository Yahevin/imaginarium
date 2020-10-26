import socket from "@/web-socket/index";
import {EVENTS} from "@my-app/client-events/index";

const SocketAction = {
    auth(user_id: number) : void {
        socket.send(JSON.stringify({
            type: EVENTS.AUTH,
            payload: user_id
        }))
    },
    join(room_id: number) : void {
        socket.send(JSON.stringify({
            type: EVENTS.JOIN,
            payload: room_id
        }))
    },
    leave() : void {
        socket.send(JSON.stringify({
            type: EVENTS.LEAVE,
        }))
    },
    putTheOrigin(question: string) : void {
        socket.send(JSON.stringify({
            type: EVENTS.PUT_THE_ORIGIN,
            payload: question
        }))
    },
    putTheFake() : void {
        socket.send(JSON.stringify({
            type: EVENTS.PUT_THE_FAKE,
        }))
    },
    makeGuess() : void {
        socket.send(JSON.stringify({
            type: EVENTS.MAKE_GUESS,
        }))
    },
    nextRound() : void {
        socket.send(JSON.stringify({
            type: EVENTS.START_NEW_ROUND,
        }))
    }
};

export default SocketAction
