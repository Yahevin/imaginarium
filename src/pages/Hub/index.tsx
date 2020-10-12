import React, {useCallback, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";

import UserAbout from "@/pages/Hub/parts/UserAbout";
import RecentGames from "@/pages/Hub/parts/RecentGames";
import Button from "@/components/Button";
import Input from "@/components/Input";
import {Menu, Menu__item} from "@/styled/Menu";
import Centered from "@/styled/Centered";

import {BUTTON_THEME, COLOR, PAGES} from "@my-app/constants";


import {InputHandler} from "@my-app/interfaces";
import {PartyAction} from "@/store/party/action";
import {PageAction} from "@/store/page/action";

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
    const dispatch = useDispatch();
    const openPartyCreating = () => {
        dispatch(PageAction.set(PAGES.CREATE));
    };
    const joinToParty = useCallback(async () => {
        try {
            const {game_action, game_master} = await deal({
                url: '/user-join',
                body: {room_id: wanted_party_id.current},
            });

            dispatch(PartyAction.setPartyId(wanted_party_id.current));
            dispatch(PartyAction.setGAction(game_action));
            dispatch(PartyAction.setGameRole(game_master));
            dispatch(PageAction.set(PAGES.LOBBY));

            // after this, will get command to update party list;
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
                                theme={BUTTON_THEME.light}
                                size={"auto"}>
                            Присоединиться
                        </Button>
                    </Menu__item>

                    <Menu__button>
                        <Button callback={openPartyCreating}
                                theme={BUTTON_THEME.dark}
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
