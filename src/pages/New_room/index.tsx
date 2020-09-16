import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";

import ThinButton from "@/components/ThinButton";
import {Menu, Menu__item} from "@/styled/Menu";

import {PageAction} from "@/store/page/action";
import PAGES from "@/constants/Pages";
import COLOR from "@/constants/Color";
import Button from "@/components/Button";
import ButtonTheme from "@/constants/ButtonTheme";
import deal from "@/helpers/deal";
import {TStore} from "@/store/reducer";
import {PartyAction} from "@/store/party/action";


const Content = styled.div`
  background: ${COLOR.white};
`;


function NewRoom() {
    const dispatch = useDispatch();
    const user_id = useSelector((store:TStore) => store.userReducer.user_id);

    const backToHub = useCallback(() => {
        dispatch(PageAction.set(PAGES.MAIN));
    },[]);

    const createNewGame = useCallback(async () => {
        try {
            const response = await deal({
                url: '/party-create',
                method: "POST",
                body: {user_id}
            });

            dispatch(PartyAction.setId(response.room_id));
            dispatch(PartyAction.setGAction(response.game_action));
            dispatch(PageAction.set(PAGES.LOBBY));
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
                            theme={ButtonTheme.green}
                            size={"auto"}>
                        Создать игру
                    </Button>
                </Menu__item>
            </Menu>

        </Content>

    )
}

export default NewRoom;
