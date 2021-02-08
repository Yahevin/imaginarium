import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SocketAction from '@/web-socket/action';
import { PartyAction } from '@/store/party/action';
import { TStore } from '@/store/reducer';

import { BUTTON_THEME, GAME_ACTION, MIN_PLAYERS_COUNT, PAGES } from '@my-app/constants';
import { Menu, Menu__item } from '@/styled/Menu';

import { Button } from '@/components/Button/Button';
import { QuestInput } from '@/pages/Game/parts/QuestInput/QuestInput';
import { TableGrid } from '@/pages/Game/parts/TableGrid/TableGrid';
import { HandGrid } from '@/pages/Game/parts/HandGrid/HandGrid';
import { FlexRowBox } from '@/styled/Flex';
import Spacer from '@/styled/Spacer';

export const GamePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const players = useSelector((store: TStore) => store.partyReducer.players);
  const question = useSelector((store: TStore) => store.partyReducer.question);
  const game_master = useSelector((store: TStore) => store.partyReducer.game_master);
  const game_action = useSelector((store: TStore) => store.partyReducer.game_action);

  const leaveParty = useCallback(() => {
    SocketAction.leave();

    dispatch(PartyAction.leave());
    history.push(PAGES.MAIN);
  }, [dispatch, history]);

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
        <FlexRowBox>
          {game_master && game_action === GAME_ACTION.START ? <QuestInput /> : QuestLine}

          <Spacer />

          <Button callback={leaveParty} theme={BUTTON_THEME.DARK}>
            Выйти
          </Button>
        </FlexRowBox>
      </Menu__item>

      <Menu__item>{game_action === GAME_ACTION.ALL_CARD_SET ? <TableGrid /> : <HandGrid />}</Menu__item>
    </Menu>
  );
};
