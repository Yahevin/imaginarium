import ButtonTheme from "@/constants/ButtonTheme";

export interface IButton {
    children: any,
    disabled?: boolean,
    className?: string,
    callback: Function,
    theme: ButtonTheme,
    size: 'auto' | '100%',
}
