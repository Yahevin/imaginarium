import { InferValueTypes } from '@imaginarium/packages/types';

export const COLOR = {
  red: '#f7786b' as const,
  rust: '#ff9200' as const,
  link: '#920fff' as const,
  white: '#f0efef' as const,
  black: '#0c0c0c' as const,
  slate: '#3e4444' as const,
  green: '#84b028' as const,
  active: '#666666' as const,
  passive: '#c4c4c4' as const,
  main: '#25bdab' as const,
  light_blue: '#1ba3e6' as const,
  light_green: '#3de61b' as const,
  transparent: 'transparent' as const,
};

export type T_COLOR = InferValueTypes<typeof COLOR>;
