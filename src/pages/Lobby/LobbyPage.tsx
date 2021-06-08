import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TStore } from '@/store/reducer';
import { COLOR, MIN_PLAYERS_COUNT, PAGES } from '@imaginarium/packages/constants';
import { Menu } from '@/styled/Menu';

import updateQuestion from '@/api-actions/updateQuestion';
import updateTable from '@/api-actions/updateTable';
import updateHand from '@/api-actions/updateHand';
import updateRole from '@/api-actions/updateRole';

import { PlayersGrid } from '@/components/PlayersGrid/PlayersGrid';
import { HeaderInGame } from '@/components/HeaderInGame/HeaderInGame';
import { Flat } from '@/styled/Flat';

export const LobbyPage = () => {
  const history = useHistory();
  const players = useSelector((store: TStore) => store.partyReducer.players);
  const room_id = useSelector((store: TStore) => store.partyReducer.room_id);

  useEffect(() => {
    if (players.length >= MIN_PLAYERS_COUNT) {
      history.replace(PAGES.GAME);
    }
  }, [players, history]);

  useEffect(() => {
    updateRole();
    updateHand();
    updateTable();
    updateQuestion();
  }, []);

  return (
    <>
      <Flat bg={COLOR.white}>
        <Menu>
          <HeaderInGame>
            <h4>{`Начало игры: комната #${room_id}`}</h4>
          </HeaderInGame>
        </Menu>
      </Flat>
      <Menu>
        <PlayersGrid players={players} />
      </Menu>
    </>
  );
};
