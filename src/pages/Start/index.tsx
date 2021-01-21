import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { PageAction } from '@/store/page/action';
import { BUTTON_THEME, PAGES } from '@my-app/constants';
import { Button } from '@/components/Button/Button';

function StartPage() {
  const dispatch = useDispatch();

  const startHandler = useCallback(() => {
    dispatch(PageAction.set(PAGES.AUTH));
  }, [dispatch]);

  return (
    <Button callback={startHandler} theme={BUTTON_THEME.GREEN} width="auto">
      Start
    </Button>
  );
}

export default StartPage;
