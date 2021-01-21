export const CARD_STATUS = {
  NEW: 'NEW' as const,
  HAND: 'HAND' as const,
  TABLE: 'TABLE' as const,
  BASKET: 'BASKET' as const,
};

export type T_CARD_STATUS = keyof typeof CARD_STATUS;
