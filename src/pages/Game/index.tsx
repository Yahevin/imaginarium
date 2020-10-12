import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import SocketAction from "@/web-socket/action";
import {PartyAction} from "@/store/party/action";
import {PageAction} from "@/store/page/action";
import {TStore} from "@/store/reducer";
import {GAME_ACTION, PAGES} from "@my-app/constants";
import ThinButton from "@/components/ThinButton";
import {Menu, Menu__item} from "@/styled/Menu";
import QuestInput from "@/pages/Game/parts/QuestInput";
import HandGrid from "@/pages/Game/parts/HandGrid";
import TableGrid from "@/pages/Game/parts/TableGrid";


function Game() {
    const dispatch = useDispatch();
    const players = useSelector((store: TStore) => store.partyReducer.players);
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
            dispatch(PageAction.set(PAGES.SCORES))
        }
    }, [game_action]);

    useEffect(()=>{
        if (players.length < 3) {
            dispatch(PageAction.set(PAGES.LOBBY));
        }
    },[players]);


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
                {game_action === GAME_ACTION.allCardSet
                    ? (<TableGrid/>)
                    : (<HandGrid/>)
                }
            </Menu__item>
        </Menu>
    )
}

export default Game;
