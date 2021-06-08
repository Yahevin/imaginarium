import { T_CLIENT_EVENTS } from '@imaginarium/packages/constants';

export interface IMessage {
  type: T_CLIENT_EVENTS;
  payload?: any;
}
