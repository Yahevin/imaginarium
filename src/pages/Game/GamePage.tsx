import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TStore } from '@/store/reducer';

import { GAME_ACTION, MIN_PLAYERS_COUNT, PAGES } from '@my-app/constants';
import { Menu, Menu__item } from '@/styled/Menu';

import { QuestInput } from '@/pages/Game/parts/QuestInput/QuestInput';
import { TableGrid } from '@/pages/Game/parts/TableGrid/TableGrid';
import { HandGrid } from '@/pages/Game/parts/HandGrid/HandGrid';
import { HeaderInGame } from '@/components/HeaderInGame/HeaderInGame';

export const GamePage = () => {
  const history = useHistory();
  const players = useSelector((store: TStore) => store.partyReducer.players);
  const question = useSelector((store: TStore) => store.partyReducer.question);
  const game_master = useSelector((store: TStore) => store.partyReducer.game_master);
  const game_action = useSelector((store: TStore) => store.partyReducer.game_action);

  useEffect(() => {
    if (game_action === GAME_ACTION.ALL_GUESS_DONE) {
      history.replace(PAGES.SCORES);
    }
  }, [game_action, history]);

  useEffect(() => {
    if (players.length < MIN_PLAYERS_COUNT) {
      history.replace(PAGES.LOBBY);
    }
  }, [players, history]);

  const QuestLine = useMemo(() => {
    return question && question?.length > 0 ? <h4>Загадано: &quot;{question}&quot;</h4> : null;
  }, [question]);

  return (
    <Menu>
      <Menu__item>
        <HeaderInGame>{game_master && game_action === GAME_ACTION.START ? <QuestInput /> : QuestLine}</HeaderInGame>
      </Menu__item>

      <Menu__item>{game_action === GAME_ACTION.ALL_CARD_SET ? <TableGrid /> : <HandGrid />}</Menu__item>
    </Menu>
  );
};
