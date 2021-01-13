import {COLOR, BUTTON_THEME} from "@my-app/constants";

function getBUTTON_THEME(theme: BUTTON_THEME) {
    switch (theme) {
        case BUTTON_THEME.light:
            return {
                bg: COLOR.transparent,
                color: COLOR.slate,
            };
        case BUTTON_THEME.dark:
            return {
                bg: COLOR.slate,
                color: COLOR.white
            };
        case BUTTON_THEME.green:
            return {
                bg: COLOR.green,
                color: COLOR.white
            };
        case BUTTON_THEME.red:
            return {
                bg: COLOR.red,
                color: COLOR.white,
            };
        default:
            return {
                bg: COLOR.transparent,
                color: COLOR.slate,
            }
    }
}

export default getBUTTON_THEME;
