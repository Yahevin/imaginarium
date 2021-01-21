import { TInputHandler } from '@my-app/interfaces';
import { T_INPUT_THEME } from '@my-app/constants';

export type TInput = {
  type?: 'text' | 'password';
  width?: 'auto' | '100%';
  theme?: T_INPUT_THEME;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  onChangeEvent?: TInputHandler;
  onFocusEvent?: TInputHandler;
  onBlurEvent?: TInputHandler;
  disabled?: boolean;
};
