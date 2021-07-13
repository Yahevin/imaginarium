import SocketAction from '@/web-socket/action';
import { TMessage } from '@imaginarium/packages/types/parts/TMessage';
import { TSubscribe } from './chat.model';

class ChatController {
  private nick_name: string;

  private update: TSubscribe['update'];

  constructor() {
    this.nick_name = undefined as unknown as string;
    this.update = undefined as unknown as TSubscribe['update'];
  }

  subscribe({ nick_name, update }: TSubscribe) {
    this.update = update;
    this.nick_name = nick_name;
  }

  getMessage(msg: TMessage | TMessage[]) {
    const msgArray = Array.isArray(msg) ? msg : [msg];
    this.update((state) => [...state, ...msgArray]);
  }

  sendMessage(message: string) {
    SocketAction.sendMessage({
      message,
      nick_name: this.nick_name,
      timeStamp: new Date().getTime(),
    });
  }
}

export const Chat = new ChatController();
