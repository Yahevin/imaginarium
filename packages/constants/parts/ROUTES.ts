import { InferValueTypes } from '@my-app/types';

export const ROUTES = {
  GET_RECENT_GAMES: '/get-recent-games' as const,
  GET_NEW_CARDS: '/get-new-cards' as const,
  GET_MY_CARDS: '/get-my-cards' as const,
  GET_PLAYERS: '/get-players' as const,
  REGISTRATION: '/registration' as const,
  AUTH_VERIFY: '/auth-verify' as const,
  GET_PLAYER: '/get-player' as const,
  USER_JOIN: '/user-join' as const,
  PUT_CARD: '/put-card' as const,
  LEADER_BOARD: '/leader-board' as const,
};

export type T_ROUTES = InferValueTypes<typeof ROUTES>;
