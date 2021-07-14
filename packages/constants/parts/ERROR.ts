export const ERROR = {
  ASK_NEW_CARDS: 'ASK_NEW_CARDS' as const,
  ROOM_ID_INCORRECT: 'ROOM_ID_INCORRECT' as const,
};

export type T_ERROR = keyof typeof ERROR;
