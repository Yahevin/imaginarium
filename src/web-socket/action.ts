import socket from "@/web-socket/index";

const SocketAction = {
    auth(user_id: number) : void {
        socket.send(JSON.stringify({
            type: 'AUTH',
            payload: user_id
        }))
    },
    join(room_id: number) : void {
        socket.send(JSON.stringify({
            type: 'JOIN',
            payload: room_id
        }))
    },
    leave() : void {
        socket.send(JSON.stringify({
            type: 'LEAVE',
        }))
    },
    putTheOrigin(question: string) : void {
        socket.send(JSON.stringify({
            type: 'PUT_THE_ORIGIN',
            payload: question
        }))
    },
    putTheFake() : void {
        socket.send(JSON.stringify({
            type: 'PUT_THE_FAKE',
        }))
    },
    makeGuess() : void {
        socket.send(JSON.stringify({
            type: 'MAKE_GUESS',
        }))
    },
    nextRound() : void {
        socket.send(JSON.stringify({
            type: 'START_NEW_ROUND',
        }))
    }
};

export default SocketAction
