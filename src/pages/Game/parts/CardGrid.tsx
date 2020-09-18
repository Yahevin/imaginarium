import React, {useCallback} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {TStore} from "@/store/reducer";
import {CardsAction} from "@/store/cards/action";

const Grid = styled.div`
  margin: 0 auto;
  height: 60vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;

  & > img {
    display: block;
    height: 100%;
    width: auto;
    margin: 0 auto;
    object-fit: contain;
    &.active {
      box-shadow: 1px 1px 1px gold;
    }
  }
`;


function CardGrid() {
    const dispatch = useDispatch();
    const selected = useSelector((store: TStore) => store.cardsReducer.selected);
    const hand_cards = useSelector((store: TStore) => store.cardsReducer.hand);

    const setSelected = useCallback((card_id) => {
        dispatch(CardsAction.setSelected(card_id));
    }, []);

    return (
        <Grid>
            {hand_cards.map((card) => {
                return (
                    <img key={card.id}
                         src={card.img_url}
                         onClick={() => {
                             setSelected(card.id)
                         }}
                         className={selected === card.id && 'active'}
                         alt="card"/>
                )
            })}
        </Grid>
    )
}

export default CardGrid;
