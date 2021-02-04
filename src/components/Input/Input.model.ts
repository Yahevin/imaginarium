import { TInputHandler } from '@my-app/interfaces';
import { T_INPUT_THEME } from '@my-app/constants';

export type TInput = {
  name: string;
  type?: 'text' | 'password';
  width?: 'auto' | '100%';
  theme?: T_INPUT_THEME;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  defaultValue?: string | number | null;
  onChangeEvent?: TInputHandler;
  onFocusEvent?: TInputHandler;
  onBlurEvent?: TInputHandler;
};
