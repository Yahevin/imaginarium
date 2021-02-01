import { SyntheticEvent } from 'react';

export type T_ThinButton = {
  callback: (event?: SyntheticEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
};
