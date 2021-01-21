import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SocketAction from '@/web-socket/action';
import { PageAction } from '@/store/page/action';
import { TStore } from '@/store/reducer';

import { BUTTON_THEME, GAME_ACTION, PAGES } from '@my-app/constants';
import { Menu, Menu__item } from '@/styled/Menu';

import { PlayersGrid } from '@/components/PlayersGrid/PlayersGrid';
import { Button } from '@/components/Button/Button';

function Scores() {
  const dispatch = useDispatch();
  const players = useSelector((store: TStore) => store.partyReducer.players);
  const game_action = useSelector((store: TStore) => store.partyReducer.game_action);

  useEffect(() => {
    if (game_action === GAME_ACTION.START) {
      dispatch(PageAction.set(PAGES.GAME));
    }
  }, [game_action, dispatch]);

  const nextRound = useCallback(() => {
    SocketAction.nextRound();
  }, []);

  return (
    <Menu>
      <Menu__item>
        <PlayersGrid players={players} />
      </Menu__item>
      <Menu__item>
        <Button callback={nextRound} theme={BUTTON_THEME.LIGHT} width="auto">
          Next round
        </Button>
      </Menu__item>
    </Menu>
  );
}

export default Scores;
