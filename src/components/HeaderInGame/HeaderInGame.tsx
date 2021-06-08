import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Spacer from '@/styled/Spacer';
import { FlexRowBox } from '@/styled/Flex';
import { Button } from '@/components/Button/Button';
import { THeaderInGame } from '@/components/HeaderInGame/HeaderInGame.model';
import { BUTTON_THEME, PAGES } from '@imaginarium/packages/constants';

import SocketAction from '@/web-socket/action';
import { PartyAction } from '@/store/party/action';
import { CardsAction } from '@/store/cards/action';

export const HeaderInGame: React.FC<THeaderInGame> = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const leaveParty = useCallback(() => {
    SocketAction.leave();

    dispatch(PartyAction.leave());
    dispatch(CardsAction.leave());

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
