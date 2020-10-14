import {EVENTS} from "@web-socket/client-events";

export interface IMessage {
    type: EVENTS,
    payload?: any
}
