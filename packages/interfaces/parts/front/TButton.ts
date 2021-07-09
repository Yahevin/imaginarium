import { T_BUTTON_THEME } from '@imaginarium/packages/constants';
import React from 'react';

export type TButton = {
  children: React.ReactNode;
  theme: T_BUTTON_THEME;
  width?: 'auto' | '100%';
  disabled?: boolean;
  className?: string;
  capture?: (event: React.SyntheticEvent) => void;
  callback?: (event: React.SyntheticEvent) => void;
};
