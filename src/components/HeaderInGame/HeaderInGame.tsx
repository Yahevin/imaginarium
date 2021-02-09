import React, { useCallback } from 'react';
import { BUTTON_THEME, PAGES } from '@my-app/constants';
import Spacer from '@/styled/Spacer';
import { Button } from '@/components/Button/Button';
import { FlexRowBox } from '@/styled/Flex';
import SocketAction from '@/web-socket/action';
import { PartyAction } from '@/store/party/action';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { THeaderInGame } from '@/components/HeaderInGame/HeaderInGame.model';

export const HeaderInGame: React.FC<THeaderInGame> = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const leaveParty = useCallback(() => {
    SocketAction.leave();

    dispatch(PartyAction.leave());
    history.push(PAGES.MAIN);
  }, [dispatch, history]);

  return (
    <FlexRowBox>
      {children}

      <Spacer />

      <Button callback={leaveParty} theme={BUTTON_THEME.DARK}>
        Выйти
      </Button>
    </FlexRowBox>
  );
};
