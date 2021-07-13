import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import deal from '@/helpers/deal';

import SocketAction from '@/web-socket/action';
import { PartyAction } from '@/store/party/action';

import { Menu, Menu__item } from '@/styled/Menu';

import { BUTTON_THEME, PAGES, ROUTES } from '@imaginarium/packages/constants';
import { TInputHandler, TUserJoin } from '@imaginarium/packages/interfaces';
import { strOrNull } from '@/helpers/nullable';

import { UserAbout } from '@/pages/Hub/parts/UserAbout/UserAbout';
import { RecentGames } from '@/pages/Hub/parts/RecentGames/RecentGames';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { HubContent, HubHeader, JoinPanel } from '@/pages/Hub/HubPage.styles';

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
      const { game_action, game_master } = await deal<TUserJoin>({
        url: ROUTES.USER_JOIN,
        body: { room_id: parseInt(partyId) },
      });

      dispatch(PartyAction.setPartyId(parseInt(partyId)));
      dispatch(PartyAction.setGAction(game_action));
      dispatch(PartyAction.setGameRole(game_master));

      // after this, will get command to update party list;
      SocketAction.join(parseInt(partyId));

      history.push(PAGES.LOBBY);
    } catch (e) {
      console.log(e);
    }
  };

  const inputHandler: TInputHandler = (event) => {
    setPartyId(event.target.value);
  };

  return (
    <>
      <HubHeader>
        <Menu>
          <UserAbout />
        </Menu>
      </HubHeader>

      <HubContent>
        <Menu>
          <JoinPanel>
            <Input type="text" name="connect" placeholder="Room_id" onChangeEvent={inputHandler} value={partyId} />

            <Button callback={joinToParty} theme={BUTTON_THEME.LIGHT} disabled={!partyId?.length}>
              Присоединиться
            </Button>
          </JoinPanel>

          <Menu__item>
            <Button callback={openPartyCreating} theme={BUTTON_THEME.DARK}>
              Создать игру
            </Button>
          </Menu__item>
        </Menu>
      </HubContent>

      <Menu>
        <RecentGames />
      </Menu>
    </>
  );
};
