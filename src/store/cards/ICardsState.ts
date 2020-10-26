import {ICard} from "@my-app/interfaces";

interface ICardsState {
    hand: ICard[],
    table: ICard[],
    selected: ICard['id'] ;
}

export default ICardsState;
