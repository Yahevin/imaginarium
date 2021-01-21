import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TStore } from '@/store/reducer';
import deal from '@/helpers/deal';
import SocketAction from '@/web-socket/action';
import CardGrid from '@/pages/Game/parts/CardGrid';
import { BUTTON_THEME, GAME_ACTION } from '@my-app/constants';
import { Menu, Menu__item } from '@/styled/Menu';
import { Button } from '@/components/Button/Button';

function TableGrid() {
  const selected = useSelector((store: TStore) => store.cardsReducer.selected);
  const table_cards = useSelector((store: TStore) => store.cardsReducer.table);
  const game_action = useSelector((store: TStore) => store.partyReducer.game_action);
  const game_master = useSelector((store: TStore) => store.partyReducer.game_master);

  const confirm_guess = useCallback(async () => {
    try {
      await deal({
        url: '/card-guess',
        body: {
          card_id: selected,
        },
      });

      // after this action, will come a command
      // to update game_action
      SocketAction.makeGuess();
    } catch (error) {
      console.log(error);
    }
  }, [selected]);

  const submit_disabled = useMemo(() => {
    return selected === null;
  }, [selected]);

  return (
    <Menu>
      <Menu__item>
        <CardGrid cards={table_cards} />
      </Menu__item>

      <Menu__item>
        {GAME_ACTION.ALL_CARD_SET === game_action && !game_master && (
          <Button callback={confirm_guess} disabled={submit_disabled} theme={BUTTON_THEME.LIGHT} width="100%">
            Выбрать
          </Button>
        )}
      </Menu__item>
    </Menu>
  );
}

export default TableGrid;
