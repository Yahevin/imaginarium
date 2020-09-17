import socket from "@/web-socket/index";

const SocketReducer = {
    auth(user_id: number) : void {
        socket.send(JSON.stringify({type: 'AUTH', user_id}))
    },
};

export default SocketReducer
