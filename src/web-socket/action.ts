import socket from '@/web-socket/index';
import { CLIENT_EVENTS } from '@imaginarium/packages/constants';
import { TMessage } from '@imaginarium/packages/types';

const SocketAction = {
  auth(user_id: number): void {
    socket.send(
      JSON.stringify({
        type: CLIENT_EVENTS.AUTH,
        payload: user_id,
      }),
    );
  },
  join(room_id: number): void {
    socket.send(
      JSON.stringify({
        type: CLIENT_EVENTS.JOIN,
        payload: room_id,
      }),
    );
  },
  leave(): void {
    socket.send(
      JSON.stringify({
        type: CLIENT_EVENTS.LEAVE,
      }),
    );
  },
  nextRound(): void {
    socket.send(
      JSON.stringify({
        type: CLIENT_EVENTS.START_NEW_ROUND,
      }),
    );
  },
  sendMessage(msg: TMessage): void {
    socket.send(
      JSON.stringify({
        type: CLIENT_EVENTS.SEND_MESSAGE,
        payload: msg,
      }),
    );
  },
};

export default SocketAction;
