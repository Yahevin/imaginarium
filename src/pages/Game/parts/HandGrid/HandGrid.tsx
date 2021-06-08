import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deal from '@/helpers/deal';
import SocketAction from '@/web-socket/action';
import { TStore } from '@/store/reducer';
import { CardsAction } from '@/store/cards/action';
import { Menu, Menu__item } from '@/styled/Menu';
import { BUTTON_THEME, GAME_ACTION, ROUTES } from '@imaginarium/packages/constants';
import { CardGrid } from '@/components/CardGrid/CardGrid';
import { Button } from '@/components/Button/Button';
import { ICard, TPutTheCard } from '@imaginarium/packages/interfaces';

export const HandGrid = () => {
  const dispatch = useDispatch();
  const [awaitDeal, setAwaitDeal] = useState(false);
  const selectedHand = useSelector((store: TStore) => store.cardsReducer.selectedHand);
  const hand_cards = useSelector((store: TStore) => store.cardsReducer.hand);
  const game_action = useSelector((store: TStore) => store.partyReducer.game_action);
  const game_master = useSelector((store: TStore) => store.partyReducer.game_master);
  const room_id = useSelector((store: TStore) => store.partyReducer.room_id);

  const confirm_select = useCallback(async () => {
    if (!selectedHand || room_id === null) return;

    setAwaitDeal(true);
    try {
      await deal<TPutTheCard>({
        url: ROUTES.PUT_CARD,
        body: {
          room_id,
          card_id: selectedHand,
        },
      });

      // after this action, will come a command
      // to update game_action
      SocketAction.putTheFake();
      // remove card from hand
      dispatch(CardsAction.putToTable(selectedHand));
    } catch (error) {
      setAwaitDeal(false);
      console.log(error);
    }
  }, [room_id, selectedHand, dispatch]);

  const submit_disabled = useMemo(() => {
    // eslint-disable-next-line no-magic-numbers
    return selectedHand === null || awaitDeal || hand_cards.length < 6;
  }, [selectedHand, hand_cards, awaitDeal]);

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
          <Button callback={confirm_select} disabled={submit_disabled} theme={BUTTON_THEME.GREEN} width="100%">
            Выбрать
          </Button>
        )}
      </Menu__item>
    </Menu>
  );
};
