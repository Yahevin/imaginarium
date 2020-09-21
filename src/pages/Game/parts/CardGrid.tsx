import React, {useCallback, useMemo} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {TStore} from "@/store/reducer";
import {CardsAction} from "@/store/cards/action";
import {Menu, Menu__item} from "@/styled/Menu";
import Button from "@/components/Button";
import ButtonTheme from "@/constants/ButtonTheme";
import deal from "@/helpers/deal";
import GAME_ACTION from "@/constants/GAME_ACTION";
import SocketAction from "@/web-socket/action";

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
    const game_action = useSelector((store: TStore) => store.partyReducer.game_action);

    const setSelected = useCallback((card_id) => {
        dispatch(CardsAction.setSelected(card_id));
    }, []);

    const confirm_select = useCallback(async () => {
        await deal({
            url: '/put-card',
            body: {
                card_id: selected
            },
        });

        SocketAction.putTheFake();
        dispatch(CardsAction.putToTable(selected));
    }, [selected]);

    const submit_disabled = useMemo(() => {
        return selected !== null;
    }, [selected]);

    const submit_theme = useMemo(() => {
        return submit_disabled
            ? ButtonTheme.red
            : ButtonTheme.green;
    }, [submit_disabled]);

    return (
        <Menu>
            <Menu__item>
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
            </Menu__item>

            <Menu__item>
                { GAME_ACTION.gmCardSet === game_action && (
                    <Button callback={confirm_select}
                            theme={submit_theme}
                            disabled={submit_disabled}
                            size={"100%"}>
                        Выбрать
                    </Button>
                )}
            </Menu__item>
        </Menu>

    )
}

export default CardGrid;
