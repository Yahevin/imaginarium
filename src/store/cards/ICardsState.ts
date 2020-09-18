import ICard from "@/interfaces/ICard";

interface ICardsState {
    hand: ICard[],
    table: ICard[],
    selected: ICard['id'] ;
}

export default ICardsState;
