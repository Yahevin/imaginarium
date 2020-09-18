import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import SocketAction from "@/web-socket/action";
import {PartyAction} from "@/store/party/action";
import {PageAction} from "@/store/page/action";
import {TStore} from "@/store/reducer";
import PAGES from "@/constants/Pages";
import updateHand from "@/web-socket/helpers/updateHand";
import ThinButton from "@/components/ThinButton";
import {Menu, Menu__item} from "@/styled/Menu";


function Game() {
    const dispatch = useDispatch();
    const hand_cards = useSelector((store:TStore)=>store.cardsReducer.hand);

    const leaveParty = useCallback(() => {
        SocketAction.leave();

        dispatch(PartyAction.setPartyId(null));
        dispatch(PageAction.set(PAGES.MAIN));
    }, []);

    useEffect(() => {
        updateHand();
    });

    return (
        <Menu>
            <Menu__item>
                <ThinButton callback={leaveParty}>
                    Выйти
                </ThinButton>
            </Menu__item>
            <Menu__item>

            </Menu__item>
        </Menu>
    )
}

export default Game;
