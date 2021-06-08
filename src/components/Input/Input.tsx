import React from 'react';
import { TInput } from '@/components/Input/Input.model';
import { StyledInput } from '@/components/Input/Input.styles';
import { TColorScheme } from '@imaginarium/packages/interfaces';
import { getInputTheme } from '@/components/Input/utils/getInputTheme';
import { INPUT_THEME } from '@imaginarium/packages/constants';

export const Input = ({
  theme = INPUT_THEME.LIGHT,
  disabled = false,
  defaultValue = '',
  type = 'text',
  width = 'auto',
  name,
  className,
  placeholder,
  onChangeEvent,
  onFocusEvent,
  onBlurEvent,
}: TInput) => {
  const colorScheme: TColorScheme = getInputTheme(theme, disabled);

  return (
    <StyledInput
      type={type}
      name={name}
      className={className}
      placeholder={placeholder}
      defaultValue={defaultValue ?? ''}
      onChange={onChangeEvent}
      onFocus={onFocusEvent}
      onBlur={onBlurEvent}
      colorScheme={colorScheme}
      disabled={disabled}
      width={width}
    />
  );
};

export { StyledInput as InputRef } from '@/components/Input/Input.styles';
