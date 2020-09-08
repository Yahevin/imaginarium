import ButtonTheme from "@/constants/ButtonTheme";

interface IButton {
    children: any,
    callback: Function,
    theme: ButtonTheme,
    size: 'auto' | '100%',
}

export default IButton;
