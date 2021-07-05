import { ClientController } from './clientController';

export type Client = { controller: ClientController; send: (arg: string) => void };
