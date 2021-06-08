import { COLOR, BUTTON_THEME, T_BUTTON_THEME } from '@imaginarium/packages/constants';
import { TColorScheme } from '@imaginarium/packages/interfaces';

function getBUTTON_THEME(theme: T_BUTTON_THEME, disabled: boolean): TColorScheme {
  if (disabled) {
    return {
      bg: COLOR.passive,
      font: COLOR.white,
      border: COLOR.passive,
    };
  }

  switch (theme) {
    case BUTTON_THEME.LIGHT:
      return {
        bg: COLOR.transparent,
        font: COLOR.slate,
        border: COLOR.slate,
      };
    case BUTTON_THEME.DARK:
      return {
        bg: COLOR.slate,
        font: COLOR.white,
        border: COLOR.slate,
      };
    case BUTTON_THEME.GREEN:
      return {
        bg: COLOR.green,
        font: COLOR.white,
        border: COLOR.green,
      };
    case BUTTON_THEME.RED:
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
}

export default getBUTTON_THEME;
