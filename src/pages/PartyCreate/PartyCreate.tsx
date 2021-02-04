import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import deal from '@/helpers/deal';

import { PartyAction } from '@/store/party/action';
import { TStore } from '@/store/reducer';
import SocketAction from '@/web-socket/action';

import { BUTTON_THEME, GAME_ACTION, PAGES, ROUTES } from '@my-app/constants';
import { Button } from '@/components/Button/Button';
import { Menu, Menu__item } from '@/styled/Menu';
import Spacer from '@/styled/Spacer';
import { PartyCreateContent } from '@/pages/PartyCreate/PartyCreate.styles';
import { FlexRowBox } from '@/styled/Flex';
import { TPartyCreate } from '@my-app/interfaces';

export const PartyCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((store: TStore) => store.userReducer.user_id);

  const backToHub = useCallback(() => {
    history.push(PAGES.MAIN);
  }, [history]);

  const createNewGame = useCallback(async () => {
    try {
      const response = await deal<TPartyCreate>({
        url: ROUTES.PARTY_CREATE,
      });

      dispatch(PartyAction.setGAction(GAME_ACTION.START));
      dispatch(PartyAction.setPartyId(response.room_id));
      dispatch(PartyAction.setGameRole(response.game_master));

      SocketAction.join(response.room_id);
      history.replace(PAGES.LOBBY);
    } catch (e) {
      console.log(e);
    }
  }, [user_id, dispatch, history]);

  return (
    <PartyCreateContent>
      <Menu>
        <Menu__item>
          <FlexRowBox>
            <h4>Создание игры</h4>
            <Spacer />
            <Button callback={backToHub} theme={BUTTON_THEME.DARK}>
              Отменить
            </Button>
          </FlexRowBox>
        </Menu__item>

        <Menu__item>
          <Button callback={createNewGame} theme={BUTTON_THEME.GREEN}>
            Создать игру
          </Button>
        </Menu__item>
      </Menu>
    </PartyCreateContent>
  );
};

export default PartyCreate;
