export type mergeTypes<First, Second> =  {[F in keyof First]: First[F]} & {[S in keyof Second]: Second[S]}
