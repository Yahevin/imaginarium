import { TInputHandler } from '@my-app/interfaces';
import { T_INPUT_THEME } from '@my-app/constants';

export type TInput = {
  type?: 'text' | 'password';
  name: string;
  theme: T_INPUT_THEME;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  onChangeEvent?: TInputHandler;
  onFocusEvent?: TInputHandler;
  onBlurEvent?: TInputHandler;
  disabled?: boolean;
  width: 'auto' | '100%';
};
