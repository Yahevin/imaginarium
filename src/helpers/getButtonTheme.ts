import COLOR from "@/constants/Color";
import ButtonTheme from "@/constants/ButtonTheme";

function getButtonTheme(theme:ButtonTheme) {
    switch (theme) {
        case ButtonTheme.light:
            return {
                bg: COLOR.transparent,
                color: COLOR.slate,
            };
        case ButtonTheme.dark:
            return {
                bg: COLOR.slate,
                color: COLOR.white
            };
        case ButtonTheme.green:
            return {
                bg: COLOR.green,
                color: COLOR.white
            };
        case ButtonTheme.red:
            return {
                bg: COLOR.red,
                color: COLOR.white,
            }
    }
}

export default getButtonTheme;
