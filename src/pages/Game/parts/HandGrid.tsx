import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deal from '@/helpers/deal';
import SocketAction from '@/web-socket/action';
import { TStore } from '@/store/reducer';
import { CardsAction } from '@/store/cards/action';
import { Menu, Menu__item } from '@/styled/Menu';
import { BUTTON_THEME, GAME_ACTION } from '@my-app/constants';
import CardGrid from '@/pages/Game/parts/CardGrid';
import { Button } from '@/components/Button/Button';

function HandGrid() {
  const dispatch = useDispatch();
  const selected = useSelector((store: TStore) => store.cardsReducer.selected);
  const hand_cards = useSelector((store: TStore) => store.cardsReducer.hand);
  const game_action = useSelector((store: TStore) => store.partyReducer.game_action);
  const game_master = useSelector((store: TStore) => store.partyReducer.game_master);

  const confirm_select = useCallback(async () => {
    if (!selected) return;

    try {
      await deal({
        url: '/put-card',
        body: {
          card_id: selected,
        },
      });

      // after this action, will come a command
      // to update game_action
      SocketAction.putTheFake();
      // remove card from hand
      dispatch(CardsAction.putToTable(selected));
    } catch (error) {
      console.log(error);
    }
  }, [selected, dispatch]);

  const submit_disabled = useMemo(() => {
    return selected === null;
  }, [selected]);

  return (
    <Menu>
      <Menu__item>
        <CardGrid cards={hand_cards} />
      </Menu__item>

      <Menu__item>
        {GAME_ACTION.GM_CARD_SET === game_action && !game_master && (
          <Button callback={confirm_select} disabled={submit_disabled} theme={BUTTON_THEME.LIGHT} width="100%">
            Выбрать
          </Button>
        )}
      </Menu__item>
    </Menu>
  );
}

export default HandGrid;
