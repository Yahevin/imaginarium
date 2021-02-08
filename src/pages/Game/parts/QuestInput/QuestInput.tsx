import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deal from '@/helpers/deal';
import SocketAction from '@/web-socket/action';
import { TStore } from '@/store/reducer';
import { CardsAction } from '@/store/cards/action';
import { TInputHandler } from '@my-app/interfaces';

import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { BUTTON_THEME, ROUTES } from '@my-app/constants';
import { TSetQuestion } from '@my-app/interfaces/parts/routes/TSetQuestion';
import { QuestWrap } from '@/pages/Game/parts/QuestInput/QuestInput.styles';
import { PartyAction } from '@/store/party/action';

export const QuestInput = () => {
  const dispatch = useDispatch();
  const room_id = useSelector((store: TStore) => store.partyReducer.room_id);
  const storeQuestion = useSelector((store: TStore) => store.partyReducer.question);
  const selectedHand = useSelector((store: TStore) => store.cardsReducer.selectedHand);

  const [question, setQuestion] = useState(storeQuestion ?? '');
  const [awaitDeal, setAwaitDeal] = useState(false);

  const submit_disabled = storeQuestion !== null || question.length === 0 || selectedHand === null || awaitDeal;

  const quest_submit = useCallback(async () => {
    if (!selectedHand && !room_id) return;
    setAwaitDeal(true);

    try {
      await deal<TSetQuestion>({
        url: ROUTES.SET_QUESTION,
        body: { room_id, question, card_id: selectedHand },
      });

      // remove selectedHand card from hand
      dispatch(CardsAction.putToTable(selectedHand));
      dispatch(PartyAction.setQuestion(question));

      // after this action, will come command
      // to update game_action and question
      SocketAction.putTheOrigin(question);
    } catch (error) {
      setAwaitDeal(false);
      console.log(error);
    }
  }, [room_id, question, selectedHand, dispatch]);

  const inputHandler: TInputHandler = useCallback((event) => {
    setQuestion(event.target.value);
  }, []);

  return (
    <QuestWrap>
      <Input
        type="text"
        name="question"
        placeholder="Ассоциация"
        defaultValue={question}
        onChangeEvent={inputHandler}
      />
      <Button callback={quest_submit} disabled={submit_disabled} theme={BUTTON_THEME.GREEN} width="auto">
        Submit
      </Button>
    </QuestWrap>
  );
};
