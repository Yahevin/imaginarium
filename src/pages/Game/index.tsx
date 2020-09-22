import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import SocketAction from "@/web-socket/action";
import {PartyAction} from "@/store/party/action";
import {PageAction} from "@/store/page/action";
import {TStore} from "@/store/reducer";
import PAGES from "@/constants/Pages";
import ThinButton from "@/components/ThinButton";
import {Menu, Menu__item} from "@/styled/Menu";
import QuestInput from "@/pages/Game/parts/QuestInput";
import GAME_ACTION from "@/constants/GAME_ACTION";
import HandGrid from "@/pages/Game/parts/HandGrid";
import TableGrid from "@/pages/Game/parts/TableGrid";


function Game() {
    const history = useHistory();
    const dispatch = useDispatch();
    const question = useSelector((store: TStore) => store.partyReducer.question);
    const game_master = useSelector((store: TStore) => store.partyReducer.game_master);
    const game_action = useSelector((store: TStore) => store.partyReducer.game_action);

    const leaveParty = useCallback(() => {
        SocketAction.leave();

        dispatch(PartyAction.setPartyId(null));
        dispatch(PageAction.set(PAGES.MAIN));
    }, []);

    useEffect(() => {
        if (game_action === GAME_ACTION.allGuessDone) {
            history.push('/scores')
        }
    }, [game_action]);


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
                {game_action === GAME_ACTION.gmCardSet && (
                    <HandGrid/>
                )}
                {game_action === GAME_ACTION.allCardSet && (
                    <TableGrid/>
                )}
            </Menu__item>
        </Menu>
    )
}

export default Game;
