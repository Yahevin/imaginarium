import React from "react";
import styled from "styled-components";

import UserAbout from "@/pages/Hub/parts/UserAbout";
import RecentGames from "@/pages/Hub/parts/RecentGames";
import Button from "@/components/Button";
import {Menu, Menu__item} from "@/styled/Menu";
import Centered from "@/styled/Centered";
import ButtonTheme from "@/constants/ButtonTheme";
import COLOR from "@/constants/Color";
import {useDispatch} from "react-redux";
import {PageAction} from "@/store/page/action";
import PAGES from "@/constants/Pages";

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
    const newRoom = () => {
        dispatch(PageAction.set(PAGES.NEW_ROOM));
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

                    <Menu__button>
                        <Button callback={newRoom}
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
