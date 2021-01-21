export const BASE_THEME = {
  LIGHT: 'LIGHT' as const,
  DARK: 'DARK' as const,
  GREEN: 'GREEN' as const,
  RED: 'RED' as const,
};

export type T_BASE_THEME = keyof typeof BASE_THEME;
