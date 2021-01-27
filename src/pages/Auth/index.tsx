import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import deal from '@/helpers/deal';

import SocketAction from '@/web-socket/action';
import { UserAction } from '@/store/user/action';

import { BUTTON_THEME, PAGES } from '@my-app/constants';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import PageSize from '@/styled/PageSize';
import Spacer from '@/styled/Spacer';

const ListedBtn = styled(Button)``;
const ListedInput = styled(Input)``;

const AuthBox = styled.form`
  ${PageSize};
  height: auto;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  & > ${ListedInput} + ${ListedBtn} {
    margin: 60px 0 0 0;
  }

  & > ${ListedInput} + ${ListedInput} {
    margin: 20px 0 0 0;
  }

  & > ${ListedBtn} + ${ListedBtn} {
    margin: 40px 0 0 0;
  }
`;

enum view {
  initial,
  authenticate,
  registration,
}
let submitBlocked = false;

function AuthPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [control, setControl] = useState(view.initial);
  const [isValid, setValid] = useState(false);

  const pass = useRef('');
  const name = useRef('');

  const validate = useCallback(() => {
    // eslint-disable-next-line no-magic-numbers
    setValid(name.current.length > 3 && pass.current.length > 5);
  }, []);

  const login = useCallback(
    async (api) => {
      if (submitBlocked) return;
      submitBlocked = true;

      const url = window.location.origin + api;
      const body = {
        nick_name: name.current,
        password: pass.current,
      };
      try {
        const resp = await deal({ url, body });
        const user_id = parseInt(resp.user_id);
        const experience = parseInt(resp.experience);

        SocketAction.auth(user_id);

        dispatch(
          UserAction.setUser({
            user_id,
            experience,
            nick_name: name.current,
          }),
        );
        history.push(PAGES.MAIN);
      } catch (error) {
        submitBlocked = false;
        console.log(error);
      }
    },
    [dispatch],
  );

  const submit = useCallback(() => {
    control === view.registration ? login('/registration') : login('/authentication');
  }, [control, login]);

  const goToAuth = (
    <ListedBtn
      key="authBtn"
      theme={BUTTON_THEME.LIGHT}
      width="100%"
      callback={() => {
        setControl(view.authenticate);
      }}
    >
      Войти
    </ListedBtn>
  );
  const goToRegistry = (
    <ListedBtn
      key="registryBtn"
      theme={BUTTON_THEME.DARK}
      width="100%"
      callback={() => {
        setControl(view.registration);
      }}
    >
      Создать аккаунт
    </ListedBtn>
  );
  const inputs = (
    <React.Fragment key="inputs">
      <ListedInput
        type="text"
        name="nick_name"
        placeholder="Login"
        defaultValue={name.current}
        onChangeEvent={(event: React.ChangeEvent<HTMLInputElement>) => {
          name.current = event.target.value;
          validate();
        }}
      />
      <ListedInput
        type="password"
        name="password"
        placeholder="Password"
        defaultValue={pass.current}
        onChangeEvent={(event: React.ChangeEvent<HTMLInputElement>) => {
          pass.current = event.target.value;
          validate();
        }}
      />
    </React.Fragment>
  );
  const submitBtn = (
    <ListedBtn
      key="submitBtn"
      callback={submit}
      theme={isValid ? BUTTON_THEME.GREEN : BUTTON_THEME.RED}
      disabled={!isValid}
      width="100%"
    >
      Готово
    </ListedBtn>
  );

  return (
    <AuthBox
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <h1>Imaginarium</h1>

      <Spacer />

      {control === view.initial ? [goToAuth, goToRegistry] : [inputs, submitBtn]}

      {control === view.registration && goToAuth}

      {control === view.authenticate && goToRegistry}
    </AuthBox>
  );
}

export default AuthPage;
