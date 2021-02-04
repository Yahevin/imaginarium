import { InferResultType } from './InferResultType';

type TResponse<T> =
  | ({ success: boolean } & (T extends {} ? InferResultType<T> : {}))
  | { success: boolean; error: string };
export type TResponseFunc<T> = { json: (arg: TResponse<T>) => void };
