import { TMessage } from '@imaginarium/packages/types/parts/TMessage';

export type TSubscribe = { nick_name: string; update: (arg: (state: TMessage[]) => TMessage[]) => void };
