export const ENTER_WINDOW = {
  AUTHENTICATE: 'AUTHENTICATE' as const,
  REGISTRATION: 'REGISTRATION' as const,
};

export type TEnterWindow = keyof typeof ENTER_WINDOW | null;
