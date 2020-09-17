import React, {useCallback, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";

import UserAbout from "@/pages/Hub/parts/UserAbout";
import RecentGames from "@/pages/Hub/parts/RecentGames";
import Button from "@/components/Button";
import Input from "@/components/Input";
import {Menu, Menu__item} from "@/styled/Menu";
import Centered from "@/styled/Centered";

import ButtonTheme from "@/constants/ButtonTheme";
import COLOR from "@/constants/Color";
import PAGES from "@/constants/Pages";

import InputHandler from "@/interfaces/InputHandler";
import {PartyAction} from "@/store/party/action";
import {TStore} from "@/store/reducer";
import {PageAction} from "@/store/page/action";

import updateParty from "@/helpers/updateParty";
import deal from "@/helpers/deal";
import SocketAction from "@/web-socket/action";


const Header = styled.header`
  background-color: ${COLOR.dark_bg};
`;
const Content = styled.div`
  background: ${COLOR.white};
`;
const Menu__button = styled(Menu__item)`
  ${Centered};
`;

function HubPage() {
    const user_id = useSelector((store:TStore)=>store.userReducer.user_id);

    const dispatch = useDispatch();
    const openPartyCreating = () => {
        dispatch(PageAction.set(PAGES.NEW_ROOM));
    };
    const joinToParty = useCallback(async () => {
        try {
            const response = await deal({
                url: '/user-join',
                method: "POST",
                body: {user_id, room_id: wanted_party_id.current},
            });

            dispatch(PartyAction.setId(wanted_party_id.current));
            dispatch(PartyAction.setGAction(response.game_action));
            dispatch(PageAction.set(PAGES.LOBBY));
            SocketAction.join(wanted_party_id.current);
        } catch (e) {
            console.log(e)
        }
    }, []);

    const wanted_party_id = useRef(null);
    const inputHandler: InputHandler = (event) => {
        wanted_party_id.current = parseInt(event.target.value);
    };

    return (
        <>
            <Header>
                <UserAbout/>
            </Header>

            <Content>
                <Menu>
                    <Menu__item>
                        <RecentGames/>
                    </Menu__item>

                    <Menu__item>
                        <Input type={'text'}
                               name={'connect'}
                               default={wanted_party_id.current}
                               placeholder={'Room_id'}
                               onChange={inputHandler}/>

                        <Button callback={joinToParty}
                                theme={ButtonTheme.light}
                                size={"auto"}>
                            Присоединиться
                        </Button>
                    </Menu__item>

                    <Menu__button>
                        <Button callback={openPartyCreating}
                                theme={ButtonTheme.dark}
                                size={"auto"}>
                            Создать игру
                        </Button>
                    </Menu__button>
                </Menu>
            </Content>
        </>
    )
}

export default HubPage;
