import { ReactNode } from 'react';

export type Props = {
  children: ReactNode;
  isOpen: boolean;
  config?: {
    mass?: number;
    tension?: number;
    friction?: number;
    precision?: number;
  };
};
