export const BUTTON_THEME = {
  LIGHT: 'LIGHT' as const,
  DARK: 'DARK' as const,
  GREEN: 'GREEN' as const,
  RED: 'RED' as const,
};

export type T_BUTTON_THEME = keyof typeof BUTTON_THEME;
