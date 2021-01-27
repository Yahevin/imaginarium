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
  capture,
  theme,
}: TButton): JSX.Element => {
  const colorScheme = getButtonTheme(theme, disabled);
  const clickHandler = (event: React.SyntheticEvent) => {
    if (!disabled && callback) callback(event);
  };
  const captureHandler = (event: React.SyntheticEvent) => {
    if (!disabled && capture) capture(event);
  };

  return (
    <StyledButton
      onClick={clickHandler}
      onClickCapture={captureHandler}
      className={className}
      disabled={disabled}
      colorScheme={colorScheme}
      width={width}
    >
      {children}
    </StyledButton>
  );
};
