import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deal from '@/helpers/deal';
import SocketAction from '@/web-socket/action';
import { TStore } from '@/store/reducer';
import { CardsAction } from '@/store/cards/action';
import { TInputHandler } from '@my-app/interfaces';

import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { BUTTON_THEME } from '@my-app/constants';

export const QuestInput = () => {
  const dispatch = useDispatch();
  const selectedHand = useSelector((store: TStore) => store.cardsReducer.selectedHand);

  const [question, setQuestion] = useState('');
  const inputHandler: TInputHandler = useCallback((event) => {
    setQuestion(event.target.value);
  }, []);

  const submit_disabled = useMemo(() => {
    return question.length === 0 || selectedHand === null;
  }, [question, selectedHand]);

  const quest_submit = useCallback(async () => {
    if (!selectedHand) return;

    try {
      await deal({
        url: '/set-question',
        body: { question, card_id: selectedHand },
      });

      // remove selectedHand card from hand
      dispatch(CardsAction.putToTable(selectedHand));

      // after this action, will come command
      // to update game_action and question
      SocketAction.putTheOrigin(question);
    } catch (error) {
      console.log(error);
    }
  }, [question, selectedHand, dispatch]);

  return (
    <>
      <Input
        type="text"
        name="question"
        placeholder="Ассоциация"
        defaultValue={question}
        onChangeEvent={inputHandler}
      />
      <Button callback={quest_submit} disabled={submit_disabled} theme={BUTTON_THEME.LIGHT} width="auto">
        Submit
      </Button>
    </>
  );
};
