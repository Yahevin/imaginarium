import React, { useCallback, useRef } from 'react';
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

import UserAbout from '@/pages/Hub/parts/UserAbout';
import RecentGames from '@/pages/Hub/parts/RecentGames';
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

function HubPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const openPartyCreating = () => {
    history.push(PAGES.CREATE);
  };
  const wanted_party_id = useRef(null);

  const joinToParty = useCallback(async () => {
    try {
      const { game_action, game_master } = await deal({
        url: '/user-join',
        body: { room_id: wanted_party_id.current },
      });

      dispatch(PartyAction.setPartyId(wanted_party_id.current));
      dispatch(PartyAction.setGAction(game_action));
      dispatch(PartyAction.setGameRole(game_master));

      // after this, will get command to update party list;
      SocketAction.join(wanted_party_id.current);
      history.replace(PAGES.LOBBY);
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, history]);

  const inputHandler: TInputHandler = (event) => {
    wanted_party_id.current = parseInt(event.target.value);
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
              defaultValue={wanted_party_id.current}
            />

            <Button callback={joinToParty} theme={BUTTON_THEME.LIGHT}>
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
}

export default HubPage;
