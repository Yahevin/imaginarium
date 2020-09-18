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
    }
};

export default SocketAction
