import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocketAction from '@/web-socket/action';
import { PartyAction } from '@/store/party/action';
import { PageAction } from '@/store/page/action';
import { TStore } from '@/store/reducer';

import { BUTTON_THEME, GAME_ACTION, MIN_PLAYERS_COUNT, PAGES } from '@my-app/constants';
import { Menu, Menu__item } from '@/styled/Menu';

import QuestInput from '@/pages/Game/parts/QuestInput';
import HandGrid from '@/pages/Game/parts/HandGrid';
import TableGrid from '@/pages/Game/parts/TableGrid';
import { Button } from '@/components/Button/Button';

function Game() {
  const dispatch = useDispatch();
  const players = useSelector((store: TStore) => store.partyReducer.players);
  const question = useSelector((store: TStore) => store.partyReducer.question);
  const game_master = useSelector((store: TStore) => store.partyReducer.game_master);
  const game_action = useSelector((store: TStore) => store.partyReducer.game_action);

  const leaveParty = useCallback(() => {
    SocketAction.leave();

    dispatch(PartyAction.setPartyId(null));
    dispatch(PageAction.set(PAGES.MAIN));
  }, [dispatch]);

  useEffect(() => {
    if (game_action === GAME_ACTION.ALL_GUESS_DONE) {
      dispatch(PageAction.set(PAGES.SCORES));
    }
  }, [game_action, dispatch]);

  useEffect(() => {
    if (players.length < MIN_PLAYERS_COUNT) {
      dispatch(PageAction.set(PAGES.LOBBY));
    }
  }, [players, dispatch]);

  return (
    <Menu>
      <Menu__item>
        <Button callback={leaveParty} theme={BUTTON_THEME.DARK}>
          Выйти
        </Button>
      </Menu__item>

      <Menu__item>{game_master && game_action === GAME_ACTION.START ? <QuestInput /> : <h2>{question}</h2>}</Menu__item>

      <Menu__item>{game_action === GAME_ACTION.ALL_CARD_SET ? <TableGrid /> : <HandGrid />}</Menu__item>
    </Menu>
  );
}

export default Game;
