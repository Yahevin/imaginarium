import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PartyAction } from '@/store/party/action';
import { PageAction } from '@/store/page/action';
import { TStore } from '@/store/reducer';
import SocketAction from '@/web-socket/action';

import { BUTTON_THEME, MIN_PLAYERS_COUNT, PAGES } from '@my-app/constants';
import { Menu, Menu__item } from '@/styled/Menu';

import updateQuestion from '@/api-actions/updateQuestion';
import updateTable from '@/api-actions/updateTable';
import updateHand from '@/api-actions/updateHand';

import { PlayersGrid } from '@/components/PlayersGrid/PlayersGrid';
import { Button } from '@/components/Button/Button';

function LobbyPage() {
  const dispatch = useDispatch();
  const players = useSelector((store: TStore) => store.partyReducer.players);

  useEffect(() => {
    if (players.length >= MIN_PLAYERS_COUNT) {
      dispatch(PageAction.set(PAGES.GAME));
    }
  }, [players, dispatch]);

  useEffect(() => {
    updateHand();
    updateTable();
    updateQuestion();
  }, []);

  const leaveParty = useCallback(() => {
    SocketAction.leave();

    dispatch(PartyAction.setPartyId(null));
    dispatch(PageAction.set(PAGES.MAIN));
  }, [dispatch]);

  return (
    <Menu>
      <Menu__item>
        <Button callback={leaveParty} theme={BUTTON_THEME.DARK}>
          Покинуть игру
        </Button>
      </Menu__item>

      <Menu__item>
        <h1>Начало игры</h1>
      </Menu__item>

      <Menu__item>
        <PlayersGrid players={players} />
      </Menu__item>
    </Menu>
  );
}

export default LobbyPage;
