// import {InferValueTypes} from "@my-app/types";
//
// const GAME_ACTION = {
//     start: 'game-start' as 'game-start',
//     gmCardSet: 'gm-card-set' as 'gm-card-set',
//     allCardSet: 'all-card-set' as 'all-card-set',
//     allGuessDone: 'all-guess-done' as 'all-guess-done',
// };
//
// type TYPE_GAME_ACTION = InferValueTypes<typeof GAME_ACTION>
//
// export {GAME_ACTION, TYPE_GAME_ACTION};

export enum GAME_ACTION {
    start = 'game-start',
    gmCardSet = 'gm-card-set',
    allCardSet = 'all-card-set',
    allGuessDone = 'all-guess-done',
}
