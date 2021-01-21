import { InferValueTypes } from '@my-app/types';

export const COLOR = {
  red: '#f7786b' as const,
  rust: '#ff9200' as const,
  white: '#f0efef' as const,
  slate: '#3e4444' as const,
  green: '#4CAF50' as const,
  active: '#666666' as const,
  passive: '#C4C4C4' as const,
  dark_bg: '#682424' as const,
  light_bg: '#f0efef' as const,
  transparent: 'transparent' as const,
};

export type T_COLOR = InferValueTypes<typeof COLOR>;
