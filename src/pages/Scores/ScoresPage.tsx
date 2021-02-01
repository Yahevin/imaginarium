import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SocketAction from '@/web-socket/action';
import { TStore } from '@/store/reducer';

import { BUTTON_THEME, GAME_ACTION, PAGES } from '@my-app/constants';
import { Menu, Menu__item } from '@/styled/Menu';

import { PlayersGrid } from '@/components/PlayersGrid/PlayersGrid';
import { Button } from '@/components/Button/Button';

export const ScoresPage = () => {
  const history = useHistory();
  const players = useSelector((store: TStore) => store.partyReducer.players);
  const game_action = useSelector((store: TStore) => store.partyReducer.game_action);
  const game_master = useSelector((store: TStore) => store.partyReducer.game_master);

  useEffect(() => {
    if (game_action !== GAME_ACTION.ALL_GUESS_DONE) {
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
      {game_master && (
        <Menu__item>
          <Button callback={nextRound} theme={BUTTON_THEME.LIGHT} width="auto">
            Next round
          </Button>
        </Menu__item>
      )}
    </Menu>
  );
};
