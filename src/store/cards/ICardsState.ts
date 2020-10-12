import * as ICard from "interfaces";

interface ICardsState {
    hand: ICard[],
    table: ICard[],
    selected: ICard['id'] ;
}

export default ICardsState;
