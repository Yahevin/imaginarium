export const GAME_ACTION = {
  START: 'START' as const,
  GM_CARD_SET: 'GM_CARD_SET' as const,
  ALL_CARD_SET: 'ALL_CARD_SET' as const,
  ALL_GUESS_DONE: 'ALL_GUESS_DONE' as const,
  END_GAME: 'END_GAME' as const,
};

export type T_GAME_ACTION = keyof typeof GAME_ACTION;
