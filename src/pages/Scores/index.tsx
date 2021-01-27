import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SocketAction from '@/web-socket/action';
import { TStore } from '@/store/reducer';

import { BUTTON_THEME, GAME_ACTION, PAGES } from '@my-app/constants';
import { Menu, Menu__item } from '@/styled/Menu';

import { PlayersGrid } from '@/components/PlayersGrid/PlayersGrid';
import { Button } from '@/components/Button/Button';

function Scores() {
  const history = useHistory();
  const players = useSelector((store: TStore) => store.partyReducer.players);
  const game_action = useSelector((store: TStore) => store.partyReducer.game_action);

  useEffect(() => {
    if (game_action === GAME_ACTION.START) {
      history.replace(PAGES.GAME);
    }
  }, [game_action, history]);

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
