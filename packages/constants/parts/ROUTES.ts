export const ROUTES = {
  GET_RECENT_GAMES: '/get-recent-games' as const,
};

export type T_ROUTES = keyof typeof ROUTES;
