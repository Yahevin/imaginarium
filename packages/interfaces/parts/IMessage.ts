import {EVENTS} from "@my-app/client-events";

export interface IMessage {
    type: EVENTS,
    payload?: any
}
