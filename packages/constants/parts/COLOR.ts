// import {InferValueTypes} from "@my-app/types";
//
// const COLOR = {
//     red: '#f7786b' as '#f7786b',
//     white: '#f0efef' as '#f0efef',
//     slate: '#3e4444' as '#3e4444',
//     green: '#4CAF50' as '#4CAF50',
//     active: '#666666' as '#666666',
//     passive: '#C4C4C4' as '#C4C4C4',
//     dark_bg: '#682424' as '#682424',
//     light_bg: '#f0efef' as '#f0efef',
//     transparent: 'transparent' as 'transparent',
// };
//
// type TYPE_COLOR = InferValueTypes<typeof COLOR>
//
// export {COLOR, TYPE_COLOR};

export enum COLOR {
    red = '#f7786b',
    white = '#f0efef',
    slate = '#3e4444',
    green = '#4CAF50',
    active = '#666666',
    passive = '#C4C4C4',
    dark_bg = '#682424',
    light_bg = '#f0efef',
    transparent = 'transparent',
}
