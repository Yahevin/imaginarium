import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import deal from '@/helpers/deal';

import SocketAction from '@/web-socket/action';
import { PartyAction } from '@/store/party/action';

import { Menu, Menu__item } from '@/styled/Menu';
import Centered from '@/styled/Centered';

import { BUTTON_THEME, COLOR, PAGES } from '@my-app/constants';
import { TInputHandler } from '@my-app/interfaces';
import { strOrNull } from '@/helpers/nullable';

import { UserAbout } from '@/pages/Hub/parts/UserAbout/UserAbout';
import { RecentGames } from '@/pages/Hub/parts/RecentGames/RecentGames';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';

const Header = styled.header`
  background-color: ${COLOR.dark_bg};
`;
const Content = styled.div`
  background: ${COLOR.white};
`;
const Menu__button = styled(Menu__item)`
  ${Centered};
`;

export const HubPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [partyId, setPartyId] = useState(strOrNull);
  const openPartyCreating = () => {
    history.push(PAGES.CREATE);
  };

  const joinToParty = async () => {
    if (!partyId) return;

    try {
      const { game_action, game_master } = await deal({
        url: '/user-join',
        body: { room_id: partyId },
      });

      dispatch(PartyAction.setPartyId(parseInt(partyId)));
      dispatch(PartyAction.setGAction(game_action));
      dispatch(PartyAction.setGameRole(game_master));

      // after this, will get command to update party list;
      SocketAction.join(parseInt(partyId));

      history.replace(PAGES.LOBBY);
    } catch (e) {
      console.log(e);
    }
  };

  const inputHandler: TInputHandler = (event) => {
    setPartyId(event.target.value);
  };

  return (
    <>
      <Header>
        <UserAbout />
      </Header>

      <Content>
        <Menu>
          <Menu__item>
            <RecentGames />
          </Menu__item>

          <Menu__item>
            <Input
              type="text"
              name="connect"
              placeholder="Room_id"
              onChangeEvent={inputHandler}
              defaultValue={partyId}
            />

            <Button callback={joinToParty} theme={BUTTON_THEME.LIGHT} disabled={!partyId?.length}>
              Присоединиться
            </Button>
          </Menu__item>

          <Menu__button>
            <Button callback={openPartyCreating} theme={BUTTON_THEME.DARK}>
              Создать игру
            </Button>
          </Menu__button>
        </Menu>
      </Content>
    </>
  );
};
