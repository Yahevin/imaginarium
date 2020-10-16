import {InferResultType} from "./InferResultType";

export type InferReducerType<T> = {[K in keyof T]: InferResultType<T[K]>};
