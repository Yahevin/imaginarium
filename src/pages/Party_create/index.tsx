import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import deal from '@/helpers/deal';

import { PartyAction } from '@/store/party/action';
import { TStore } from '@/store/reducer';
import SocketAction from '@/web-socket/action';

import { BUTTON_THEME, COLOR, GAME_ACTION, PAGES } from '@my-app/constants';
import { Button } from '@/components/Button/Button';
import { Menu, Menu__item } from '@/styled/Menu';

const Content = styled.div`
  background: ${COLOR.white};
`;

function PartyCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((store: TStore) => store.userReducer.user_id);

  const backToHub = useCallback(() => {
    history.push(PAGES.MAIN);
  }, [history]);

  const createNewGame = useCallback(async () => {
    try {
      const response = await deal({
        url: '/party-create',
        body: { user_id },
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
    <Content>
      <Menu>
        <Menu__item>
          <Button callback={backToHub} theme={BUTTON_THEME.DARK}>
            Отменить
          </Button>
        </Menu__item>

        <Menu__item>
          <h1>Создание игры</h1>
        </Menu__item>

        <Menu__item>
          <Button callback={createNewGame} theme={BUTTON_THEME.GREEN}>
            Создать игру
          </Button>
        </Menu__item>
      </Menu>
    </Content>
  );
}

export default PartyCreate;
