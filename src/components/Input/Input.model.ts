import { TInputHandler, TKeyInputHandler } from '@imaginarium/packages/interfaces';
import { T_INPUT_THEME } from '@imaginarium/packages/constants';

export type TInput = {
  name: string;
  value: string | number | null;
  onChangeEvent: TInputHandler;
  type?: 'text' | 'password';
  width?: 'auto' | '100%';
  theme?: T_INPUT_THEME;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onFocusEvent?: TInputHandler;
  onBlurEvent?: TInputHandler;
  onEnterEvent?: TKeyInputHandler;
  onEscapeEvent?: TKeyInputHandler;
};
