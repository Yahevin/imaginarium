import { COLOR, INPUT_THEME, T_INPUT_THEME } from '@my-app/constants';
import { TColorScheme } from '@my-app/interfaces/parts/front/TColorScheme';

export const getInputTheme = (theme: T_INPUT_THEME, disabled: boolean): TColorScheme => {
  if (disabled) {
    return {
      bg: COLOR.passive,
      font: COLOR.slate,
      border: COLOR.passive,
    };
  }

  switch (theme) {
    case INPUT_THEME.LIGHT:
      return {
        bg: COLOR.transparent,
        font: COLOR.slate,
        border: COLOR.slate,
      };
    case INPUT_THEME.DARK:
      return {
        bg: COLOR.slate,
        font: COLOR.white,
        border: COLOR.slate,
      };
    case INPUT_THEME.GREEN:
      return {
        bg: COLOR.green,
        font: COLOR.white,
        border: COLOR.green,
      };
    case INPUT_THEME.RED:
      return {
        bg: COLOR.red,
        font: COLOR.white,
        border: COLOR.red,
      };
    default:
      return {
        bg: COLOR.transparent,
        font: COLOR.slate,
        border: COLOR.slate,
      };
  }
};
