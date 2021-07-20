import React from 'react';
import { TInput } from '@/components/Input/Input.model';
import { StyledInput } from '@/components/Input/Input.styles';
import { TColorScheme } from '@imaginarium/packages/interfaces';
import { getInputTheme } from '@/components/Input/utils/getInputTheme';
import { INPUT_THEME } from '@imaginarium/packages/constants';

export const Input = ({
  theme = INPUT_THEME.LIGHT,
  disabled = false,
  name,
  value,
  refObj,
  type = 'text',
  width = 'auto',
  className,
  placeholder,
  onChangeEvent,
  onFocusEvent,
  onBlurEvent,
  onEnterEvent,
  onEscapeEvent,
}: TInput) => {
  const colorScheme: TColorScheme = getInputTheme(theme, disabled);

  return (
    <StyledInput
      type={type}
      name={name}
      className={className}
      placeholder={placeholder}
      value={value ?? ''}
      onKeyDown={(event) => {
        switch (event.key) {
          case 'Enter':
            return onEnterEvent && onEnterEvent(event);
          case 'Escape':
            return onEscapeEvent && onEscapeEvent(event);
          default:
        }
      }}
      onChange={onChangeEvent}
      onFocus={onFocusEvent}
      onBlur={onBlurEvent}
      colorScheme={colorScheme}
      disabled={disabled}
      width={width}
      ref={(node: HTMLInputElement) => {
        if (refObj) {
          // eslint-disable-next-line no-param-reassign
          refObj.current = node;
        }
      }}
    />
  );
};

export { StyledInput as InputRef } from '@/components/Input/Input.styles';
