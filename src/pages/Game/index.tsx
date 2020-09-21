import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import SocketAction from "@/web-socket/action";
import {PartyAction} from "@/store/party/action";
import {PageAction} from "@/store/page/action";
import {TStore} from "@/store/reducer";
import PAGES from "@/constants/Pages";
import ThinButton from "@/components/ThinButton";
import {Menu, Menu__item} from "@/styled/Menu";
import QuestInput from "@/pages/Game/parts/QuestInput";
import CardGrid from "@/pages/Game/parts/CardGrid";
import GAME_ACTION from "@/constants/GAME_ACTION";


function Game() {
    const dispatch = useDispatch();

    const question  = useSelector((store: TStore) => store.partyReducer.question);
    const game_master = useSelector((store: TStore) => store.partyReducer.game_master);
    const game_action = useSelector((store: TStore) => store.partyReducer.game_action);

    const leaveParty = useCallback(() => {
        SocketAction.leave();

        dispatch(PartyAction.setPartyId(null));
        dispatch(PageAction.set(PAGES.MAIN));
    }, []);


    return (
        <Menu>
            <Menu__item>
                <ThinButton callback={leaveParty}>
                    Выйти
                </ThinButton>
            </Menu__item>

            <Menu__item>
                {game_master && game_action === GAME_ACTION.start
                    ? (<QuestInput/>)
                    : (<h2>{question}</h2>)
                }
            </Menu__item>

            <Menu__item>
                <CardGrid/>
            </Menu__item>
        </Menu>
    )
}

export default Game;
