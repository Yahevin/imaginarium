import { InferArgumentsType } from './InferArgumentsType';

export type TRequirement<T> = { body: InferArgumentsType<T> };
