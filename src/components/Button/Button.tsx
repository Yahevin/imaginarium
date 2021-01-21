import React from 'react';
import { TButton } from '@my-app/interfaces';
import { StyledButton } from '@/components/Button/Button.styles';
import getButtonTheme from './util/getButtonTheme';

export const Button = ({
  disabled = false,
  width = 'auto',
  className,
  children,
  callback,
  theme,
}: TButton): JSX.Element => {
  const colorScheme = getButtonTheme(theme, disabled);
  const clickHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!disabled) callback();
  };

  return (
    <StyledButton
      onClick={clickHandler}
      className={className}
      disabled={disabled}
      colorScheme={colorScheme}
      width={width}
    >
      {children}
    </StyledButton>
  );
};
