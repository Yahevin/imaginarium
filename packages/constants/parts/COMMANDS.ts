export const COMMANDS = {
  END_GAME: 'END_GAME' as const,
  SHOW_SCORE: 'SHOW_SCORE' as const,
  UPDATE_ALL: 'UPDATE_ALL' as const,
  UPDATE_ROLE: 'UPDATE_ROLE' as const,
  UPDATE_HAND: 'UPDATE_HAND' as const,
  START_GUESS: 'START_GUESS' as const,
  UPDATE_PARTY: 'UPDATE_PARTY' as const,
  UPDATE_QUESTION: 'UPDATE_QUESTION' as const,
  UPDATE_ACTION: 'UPDATE_ACTION' as const,
};

export type T_COMMANDS = keyof typeof COMMANDS;
