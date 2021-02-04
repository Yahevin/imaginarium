import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { PartyAction } from '@/store/party/action';
import { TStore } from '@/store/reducer';
import SocketAction from '@/web-socket/action';

import { BUTTON_THEME, MIN_PLAYERS_COUNT, PAGES } from '@my-app/constants';
import { Menu, Menu__item } from '@/styled/Menu';

import updateQuestion from '@/api-actions/updateQuestion';
import updateTable from '@/api-actions/updateTable';
import updateHand from '@/api-actions/updateHand';

import { PlayersGrid } from '@/components/PlayersGrid/PlayersGrid';
import { Button } from '@/components/Button/Button';
import Spacer from '@/styled/Spacer';
import { FlexRowBox } from '@/styled/Flex';

export const LobbyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const players = useSelector((store: TStore) => store.partyReducer.players);

  useEffect(() => {
    if (players.length >= MIN_PLAYERS_COUNT) {
      history.replace(PAGES.GAME);
    }
  }, [players, history]);

  useEffect(() => {
    updateHand();
    updateTable();
    updateQuestion();
  }, []);

  const leaveParty = useCallback(() => {
    SocketAction.leave();

    dispatch(PartyAction.setPartyId(null));
    history.replace(PAGES.MAIN);
  }, [dispatch, history]);

  return (
    <Menu>
      <Menu__item>
        <FlexRowBox>
          <h4>Начало игры</h4>
          <Spacer />
          <Button callback={leaveParty} theme={BUTTON_THEME.DARK}>
            Покинуть игру
          </Button>
        </FlexRowBox>
      </Menu__item>

      <Menu__item>
        <PlayersGrid players={players} />
      </Menu__item>
    </Menu>
  );
};
