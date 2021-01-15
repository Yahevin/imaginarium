import { T_BUTTON_THEME } from '@my-app/constants';
import React from 'react';

export type TButton = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  callback: () => void;
  theme: T_BUTTON_THEME;
  size?: 'auto' | '100%';
};
