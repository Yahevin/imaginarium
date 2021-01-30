import React from 'react';
import { T_ThinButton } from '@/components/ThinButton/ThinButton.model';
import { StyledThinButton } from '@/components/ThinButton/ThinButton.styles';

export const ThinButton: React.FC<T_ThinButton> = ({ callback, children }) => {
  return <StyledThinButton onClick={callback}>{children}</StyledThinButton>;
};
