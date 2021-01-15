import { COLOR, BUTTON_THEME, T_BUTTON_THEME } from '@my-app/constants';
import { TColorScheme } from '@my-app/interfaces/parts/front/TColorScheme';

function getBUTTON_THEME(theme: T_BUTTON_THEME, disabled: boolean): TColorScheme {
  if (disabled) {
    return {
      bg: COLOR.passive,
      color: COLOR.white,
      border: COLOR.passive,
    };
  }

  switch (theme) {
    case BUTTON_THEME.LIGHT:
      return {
        bg: COLOR.transparent,
        color: COLOR.slate,
        border: COLOR.slate,
      };
    case BUTTON_THEME.DARK:
      return {
        bg: COLOR.slate,
        color: COLOR.white,
        border: COLOR.slate,
      };
    case BUTTON_THEME.GREEN:
      return {
        bg: COLOR.green,
        color: COLOR.white,
        border: COLOR.green,
      };
    case BUTTON_THEME.RED:
      return {
        bg: COLOR.red,
        color: COLOR.white,
        border: COLOR.red,
      };
    default:
      return {
        bg: COLOR.transparent,
        color: COLOR.slate,
        border: COLOR.slate,
      };
  }
}

export default getBUTTON_THEME;
