import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SocketAction from '@/web-socket/action';
import { TStore } from '@/store/reducer';

import { BUTTON_THEME, GAME_ACTION, GAME_MAX_SCORE, PAGES } from '@imaginarium/packages/constants';
import { Menu, Menu__item } from '@/styled/Menu';

import { PlayersGrid } from '@/components/PlayersGrid/PlayersGrid';
import { Button } from '@/components/Button/Button';
import { HeaderInGame } from '@/components/HeaderInGame/HeaderInGame';

export const ScoresPage = () => {
  const history = useHistory();
  const players = useSelector((store: TStore) => store.partyReducer.players);
  const rewards = useSelector((store: TStore) => store.partyReducer.rewards);
  const game_action = useSelector((store: TStore) => store.partyReducer.game_action);
  const game_master = useSelector((store: TStore) => store.partyReducer.game_master);

  useEffect(() => {
    if (game_action !== GAME_ACTION.ALL_GUESS_DONE && game_action !== GAME_ACTION.END_GAME) {
      history.replace(PAGES.GAME);
    }
  }, [game_action, history]);

  const nextRound = useCallback(() => {
    SocketAction.nextRound();
  }, []);

  return (
    <Menu>
      <Menu__item>
        <HeaderInGame>
          {game_action === GAME_ACTION.END_GAME && (
            <h4>{`Игрок ${players.filter((item) => item.score >= GAME_MAX_SCORE)[0].nick_name} победил`}</h4>
          )}
        </HeaderInGame>
      </Menu__item>
      <Menu__item>
        <PlayersGrid players={players} rewards={rewards} />
      </Menu__item>
      {game_master && (
        <Menu__item>
          {game_action !== GAME_ACTION.END_GAME && (
            <Button callback={nextRound} theme={BUTTON_THEME.LIGHT} width="auto">
              Next round
            </Button>
          )}
        </Menu__item>
      )}
    </Menu>
  );
};
