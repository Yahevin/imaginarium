// import {InferValueTypes} from "@my-app/types";
//
// const BUTTON_THEME =  {
//     light: 'light' as 'light',
//     dark: 'dark' as 'dark',
//     green: 'green' as 'green',
//     red: 'red' as 'red',
// };
//
// type TYPE_BUTTON_THEME = InferValueTypes<typeof BUTTON_THEME>
//
// export {BUTTON_THEME, TYPE_BUTTON_THEME};

export enum BUTTON_THEME {
    light,
    dark,
    green,
    red,
}
