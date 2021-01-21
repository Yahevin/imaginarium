import { T_CLIENT_EVENTS } from '@my-app/constants';

export interface IMessage {
  type: T_CLIENT_EVENTS;
  payload?: any;
}
