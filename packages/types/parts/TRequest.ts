import { InferArgumentsType } from './InferArgumentsType';

export type TRequest<T> = { body: InferArgumentsType<T> };
