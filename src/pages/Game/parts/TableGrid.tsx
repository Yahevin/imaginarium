import React, {useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TStore} from "@/store/reducer";
import {CardsAction} from "@/store/cards/action";
import {Menu, Menu__item} from "@/styled/Menu";
import deal from "@/helpers/deal";
import GAME_ACTION from "@/constants/GAME_ACTION";
import SocketAction from "@/web-socket/action";
import CardGrid from "@/pages/Game/parts/CardGrid";
import Submit from "@/components/Submit";


function TableGrid() {
    const dispatch = useDispatch();
    const selected = useSelector((store: TStore) => store.cardsReducer.selected);
    const table_cards = useSelector((store: TStore) => store.cardsReducer.hand);
    const game_action = useSelector((store: TStore) => store.partyReducer.game_action);


    const confirm_guess = useCallback(async () => {
        await deal({
            url: '/card-guess',
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



    return (
        <Menu>
            <Menu__item>
                <CardGrid cards={table_cards}/>
            </Menu__item>

            <Menu__item>
                { GAME_ACTION.gmCardSet === game_action && (
                    <Submit callback={confirm_guess}
                            disabled={submit_disabled}
                            size={"100%"}>
                        Выбрать
                    </Submit>
                )}
            </Menu__item>
        </Menu>

    )
}

export default TableGrid;
