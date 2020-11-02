export type TResponse<T> = { success: boolean } & T | { error: string, success: boolean };
export type TResponseFunc<T> = { json: (arg: TResponse<T>) => void };
