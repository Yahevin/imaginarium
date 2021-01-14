import { CLIENT_EVENTS } from "@my-app/constants";

export interface IMessage {
    type: CLIENT_EVENTS,
    payload?: any
}
