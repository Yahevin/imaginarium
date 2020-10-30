export type InferArgumentsType<F> = F extends (args: infer U) => any ? U : never;
