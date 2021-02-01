import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deal from '@/helpers/deal';
import SocketAction from '@/web-socket/action';
import { TStore } from '@/store/reducer';
import { CardsAction } from '@/store/cards/action';
import { Menu, Menu__item } from '@/styled/Menu';
import { BUTTON_THEME, GAME_ACTION } from '@my-app/constants';
import { CardGrid } from '@/components/CardGrid/CardGrid';
import { Button } from '@/components/Button/Button';
import { ICard } from '@my-app/interfaces';

export const HandGrid = () => {
  const dispatch = useDispatch();
  const selectedHand = useSelector((store: TStore) => store.cardsReducer.selectedHand);
  const hand_cards = useSelector((store: TStore) => store.cardsReducer.hand);
  const game_action = useSelector((store: TStore) => store.partyReducer.game_action);
  const game_master = useSelector((store: TStore) => store.partyReducer.game_master);

  const confirm_select = useCallback(async () => {
    if (!selectedHand) return;

    try {
      await deal({
        url: '/put-card',
        body: {
          card_id: selectedHand,
        },
      });

      // after this action, will come a command
      // to update game_action
      SocketAction.putTheFake();
      // remove card from hand
      dispatch(CardsAction.putToTable(selectedHand));
    } catch (error) {
      console.log(error);
    }
  }, [selectedHand, dispatch]);

  const submit_disabled = useMemo(() => {
    return selectedHand === null;
  }, [selectedHand]);

  const setSelected = (card_id: ICard['id']) => {
    dispatch(CardsAction.setSelectedHand(card_id));
  };

  return (
    <Menu>
      <Menu__item>
        <CardGrid cards={hand_cards} setSelect={setSelected} selected_id={selectedHand} />
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
};
