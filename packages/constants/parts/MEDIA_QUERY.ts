export const MEDIA_QUERY = {
  DESKTOP: '@media screen and (min-width: 1025px)' as const,
  TABLET: '@media screen and (max-width: 1024px) and (min-width: 768px)' as const,
  PHONE: '@media screen and (max-width: 767px)' as const,
};

export type T_MEDIA_QUERY = keyof typeof MEDIA_QUERY;
