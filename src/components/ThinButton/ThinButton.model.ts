import { SyntheticEvent } from 'react';

export type T_ThinButton = {
  callback: (event?: SyntheticEvent<HTMLSpanElement>) => void;
  children: React.ReactNode;
};
