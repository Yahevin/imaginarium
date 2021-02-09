import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TStore } from '@/store/reducer';
import { MIN_PLAYERS_COUNT, PAGES } from '@my-app/constants';
import { Menu, Menu__item } from '@/styled/Menu';

import updateQuestion from '@/api-actions/updateQuestion';
import updateTable from '@/api-actions/updateTable';
import updateHand from '@/api-actions/updateHand';

import { PlayersGrid } from '@/components/PlayersGrid/PlayersGrid';
import { HeaderInGame } from '@/components/HeaderInGame/HeaderInGame';

export const LobbyPage = () => {
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

  return (
    <Menu>
      <Menu__item>
        <HeaderInGame>
          <h4>Начало игры</h4>
        </HeaderInGame>
      </Menu__item>

      <Menu__item>
        <PlayersGrid players={players} />
      </Menu__item>
    </Menu>
  );
};
