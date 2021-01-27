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

function QuestInput() {
  const dispatch = useDispatch();
  const selected = useSelector((store: TStore) => store.cardsReducer.selected);

  const [question, setQuestion] = useState('');
  const inputHandler: TInputHandler = useCallback((event) => {
    setQuestion(event.target.value);
  }, []);

  const submit_disabled = useMemo(() => {
    return question.length === 0 || selected === null;
  }, [question, selected]);

  const quest_submit = useCallback(async () => {
    if (!selected) return;

    try {
      await deal({
        url: '/set-question',
        body: { question, card_id: selected },
      });

      // remove selected card from hand
      dispatch(CardsAction.putToTable(selected));

      // after this action, will come command
      // to update game_action and question
      SocketAction.putTheOrigin(question);
    } catch (error) {
      console.log(error);
    }
  }, [question, selected, dispatch]);

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
}

export default QuestInput;
