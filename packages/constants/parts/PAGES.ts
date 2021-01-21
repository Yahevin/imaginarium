import { InferValueTypes } from '@my-app/types';

export const PAGES = {
  START: '/' as const,
  AUTH: '/auth' as const,
  MAIN: '/main' as const,
  CREATE: '/create' as const,
  LOBBY: '/lobby' as const,
  GAME: '/game' as const,
  SCORES: '/scores' as const,
};

export type T_PAGES = InferValueTypes<typeof PAGES>;
