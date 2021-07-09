import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { TStore } from '@/store/reducer';
import deal from '@/helpers/deal';
import SocketAction from '@/web-socket/action';

import { BUTTON_THEME, GAME_ACTION, ROUTES } from '@imaginarium/packages/constants';
import { Menu, Menu__item } from '@/styled/Menu';
import { CardGrid } from '@/components/CardGrid/CardGrid';
import { Button } from '@/components/Button/Button';
import { numbOrNull } from '@/helpers/nullable';
import { TGuessCard } from '@imaginarium/packages/interfaces';

export const TableGrid = () => {
  const [selected, setSelected] = useState(numbOrNull);
  const [awaitDeal, setAwaitDeal] = useState(false);
  const room_id = useSelector((store: TStore) => store.partyReducer.room_id);
  const table_cards = useSelector((store: TStore) => store.cardsReducer.table);
  const game_action = useSelector((store: TStore) => store.partyReducer.game_action);
  const game_master = useSelector((store: TStore) => store.partyReducer.game_master);

  // TODO create hook to upload selected card, if store is empty
  const selectedHand = useSelector((store: TStore) => store.cardsReducer.selectedHand);

  const cardsOnTable = game_master ? table_cards : table_cards.filter((card) => card.id !== selectedHand);

  const confirm_guess = useCallback(async () => {
    if (!selected || !room_id) return;
    setAwaitDeal(true);

    try {
      await deal<TGuessCard>({
        url: ROUTES.GUESS_CARD,
        body: {
          card_id: selected,
          room_id,
        },
      });
    } catch (error) {
      setAwaitDeal(false);
      console.log(error);
    }
  }, [room_id, selected]);

  const submit_disabled = useMemo(() => {
    // eslint-disable-next-line no-magic-numbers
    return selected === null || awaitDeal;
  }, [selected, awaitDeal]);

  return (
    <Menu>
      <Menu__item>
        <CardGrid cards={cardsOnTable} setSelect={setSelected} selected_id={selected} />
      </Menu__item>

      <Menu__item>
        {GAME_ACTION.ALL_CARD_SET === game_action && !game_master && (
          <Button callback={confirm_guess} disabled={submit_disabled} theme={BUTTON_THEME.GREEN} width="100%">
            Выбрать
          </Button>
        )}
      </Menu__item>
    </Menu>
  );
};
