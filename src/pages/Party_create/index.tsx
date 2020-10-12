import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";

import ThinButton from "@/components/ThinButton";
import {Menu, Menu__item} from "@/styled/Menu";

import {PageAction} from "@/store/page/action";
import {BUTTON_THEME, COLOR, GAME_ACTION, PAGES} from "@my-app/constants";
import Button from "@/components/Button";
import deal from "@/helpers/deal";
import {TStore} from "@/store/reducer";
import {PartyAction} from "@/store/party/action";
import SocketAction from "@/web-socket/action";


const Content = styled.div`
  background: ${COLOR.white};
`;


function PartyCreate() {
    const dispatch = useDispatch();
    const user_id = useSelector((store:TStore) => store.userReducer.user_id);

    const backToHub = useCallback(() => {
        dispatch(PageAction.set(PAGES.MAIN));
    },[]);

    const createNewGame = useCallback(async () => {
        try {
            const response = await deal({
                url: '/party-create',
                body: {user_id}
            });

            dispatch(PartyAction.setGAction(GAME_ACTION.start));
            dispatch(PartyAction.setPartyId(response.room_id));
            dispatch(PartyAction.setGameRole(response.game_master));
            dispatch(PageAction.set(PAGES.LOBBY));
            SocketAction.join(response.room_id);
        } catch (e) {
            console.log(e);
        }
    },[]);

    return (
        <Content>
            <Menu>
                <Menu__item>
                    <ThinButton callback={backToHub}>
                        Отменить
                    </ThinButton>
                </Menu__item>

                <Menu__item>
                    <h1>Создание игры</h1>
                </Menu__item>

                <Menu__item>
                    <Button callback={createNewGame}
                            theme={BUTTON_THEME.green}
                            size={"auto"}>
                        Создать игру
                    </Button>
                </Menu__item>
            </Menu>

        </Content>

    )
}

export default PartyCreate;
