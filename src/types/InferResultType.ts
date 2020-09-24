type InferResultType<T> = T extends ((...args:any) => infer U) ? U : never;

export default InferResultType;
