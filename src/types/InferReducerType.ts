import InferResultType from "@/types/InferResultType";

type InferReducerType<T> = {[K in keyof T]: InferResultType<T[K]>};

export default InferReducerType;
