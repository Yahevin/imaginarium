import React, {useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TStore} from "@/store/reducer";
import {CardsAction} from "@/store/cards/action";
import {Menu, Menu__item} from "@/styled/Menu";
import deal from "@/helpers/deal";
import {GAME_ACTION} from "@my-app/constants";
import SocketAction from "@/web-socket/action";
import CardGrid from "@/pages/Game/parts/CardGrid";
import Submit from "@/components/Submit";


function HandGrid() {
    const dispatch = useDispatch();
    const selected = useSelector((store: TStore) => store.cardsReducer.selected);
    const hand_cards = useSelector((store: TStore) => store.cardsReducer.hand);
    const game_action = useSelector((store: TStore) => store.partyReducer.game_action);
    const game_master = useSelector((store: TStore) => store.partyReducer.game_master);

    const confirm_select = useCallback(async () => {
        try {
            await deal({
                url: '/put-card',
                body: {
                    card_id: selected
                },
            });

            // after this action, will come a command
            // to update game_action
            SocketAction.putTheFake();
            // remove card from hand
            dispatch(CardsAction.putToTable(selected));
        } catch (error) {
            console.log(error);
        }
    }, [selected]);

    const submit_disabled = useMemo(() => {
        return selected === null;
    }, [selected]);

    return (
        <Menu>
            <Menu__item>
                <CardGrid cards={hand_cards}/>
            </Menu__item>

            <Menu__item>
                { GAME_ACTION.gmCardSet === game_action && !game_master && (
                    <Submit callback={confirm_select}
                            disabled={submit_disabled}
                            size={"100%"}>
                        Выбрать
                    </Submit>
                )}
            </Menu__item>
        </Menu>

    )
}

export default HandGrid;
