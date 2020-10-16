// import {InferValueTypes} from "@my-app/types";
//
// const CARD_STATUS = {
//     new: 'new' as 'new',
//     hand: 'hand' as 'hand',
//     table: 'table' as 'table',
//     basket: 'basket' as 'basket',
// };
// type TYPE_CARD_STATUS = InferValueTypes<typeof CARD_STATUS>
//
//
// export {CARD_STATUS, TYPE_CARD_STATUS};

export enum CARD_STATUS {
    new,
    hand,
    table,
    basket,
}
