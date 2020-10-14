import {BUTTON_THEME} from "my-app/constants";

export interface IButton {
    children: any,
    disabled?: boolean,
    className?: string,
    callback: Function,
    theme: BUTTON_THEME,
    size: 'auto' | '100%',
}
