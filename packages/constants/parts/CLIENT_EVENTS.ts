export const CLIENT_EVENTS = {
  AUTH: 'AUTH' as const,
  JOIN: 'JOIN' as const,
  LEAVE: 'LEAVE' as const,
  MAKE_GUESS: 'MAKE_GUESS' as const,
  PUT_THE_FAKE: 'PUT_THE_FAKE' as const,
  PUT_THE_ORIGIN: 'PUT_THE_ORIGIN' as const,
  START_NEW_ROUND: 'START_NEW_ROUND' as const,
};

export type T_CLIENT_EVENTS = keyof typeof CLIENT_EVENTS;
