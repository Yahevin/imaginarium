import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {PageAction} from "@/store/page/action";
import {PartyAction} from "@/store/party/action";

import PAGES from "@/constants/Pages";

import {Menu, Menu__item} from "@/styled/Menu";
import PlayersGrid from "@/components/PlayersGrid";
import ThinButton from "@/components/ThinButton";
import SocketAction from "@/web-socket/action";
import {TStore} from "@/store/reducer";


function LobbyPage() {
    const dispatch = useDispatch();
    const players = useSelector((store: TStore) => store.partyReducer.players);

    const leaveParty = useCallback(() => {
        SocketAction.leave();

        dispatch(PartyAction.setId(null));
        dispatch(PageAction.set(PAGES.MAIN));
    }, []);

    return (
        <Menu>
            <Menu__item>
                <ThinButton callback={leaveParty}>
                    Покинуть игру
                </ThinButton>
            </Menu__item>

            <Menu__item>
                <h1>
                    Начало игры
                </h1>
            </Menu__item>

            <Menu__item>
                <PlayersGrid players={players}/>
            </Menu__item>
        </Menu>
    )
}

export default LobbyPage;
