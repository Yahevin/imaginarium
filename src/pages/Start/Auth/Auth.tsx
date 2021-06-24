import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import deal from '@/helpers/deal';

import SocketAction from '@/web-socket/action';
import { UserAction } from '@/store/user/action';
import { BUTTON_THEME, PAGES } from '@imaginarium/packages/constants';
import { ENTER_WINDOW } from '@/pages/Start/constants/EnterWindow';
import { AuthBox, AuthMessage, AuthTitle, ListedBtn, ListedInput } from '@/pages/Start/Auth/Auth.styles';
import { ThinButton } from '@/components/ThinButton/ThinButton';
import { TAuth } from '@/pages/Start/Auth/Auth.model';
import { TAuthentication } from '@imaginarium/packages/interfaces';

export const Auth: React.FC<TAuth> = ({ action, setAction }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const submitBlocked = useRef(false);
  const [isValid, setValid] = useState(false);

  const pass = useRef('');
  const name = useRef('');

  const validate = () => {
    // eslint-disable-next-line no-magic-numbers
    setValid(name.current.length > 3 && pass.current.length > 5);
  };

  const login = useCallback(
    async (api: string) => {
      if (submitBlocked.current) return;
      submitBlocked.current = true;

      const body = {
        nick_name: name.current,
        password: pass.current,
      };
      try {
        const { id: user_id, experience, token } = await deal<TAuthentication>({ url: api, body });
        document.cookie = `imaginarium_token=${token}`;
        localStorage.setItem('token', token);

        dispatch(
          UserAction.setUser({
            user_id,
            experience,
            nick_name: name.current,
          }),
        );
        SocketAction.auth(user_id);
        history.push(PAGES.MAIN);
      } catch (error) {
        submitBlocked.current = false;
        console.log(error);
      }
    },
    [dispatch, history],
  );

  const submitHandler = useCallback(() => {
    action === ENTER_WINDOW.REGISTRATION ? login('/registration') : login('/authentication');
  }, [action, login]);

  const toggleToRegistry = () => {
    setAction(ENTER_WINDOW.REGISTRATION);
  };
  const toggleToAuth = () => {
    setAction(ENTER_WINDOW.AUTHENTICATE);
  };

  return (
    <AuthBox
      onSubmit={(event) => {
        event.preventDefault();
        submitHandler();
      }}
    >
      <AuthTitle>{action === ENTER_WINDOW.AUTHENTICATE ? 'Вход' : 'Регистрация'}</AuthTitle>

      <ListedInput
        width="100%"
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
        width="100%"
        type="password"
        name="password"
        placeholder="Password"
        defaultValue={pass.current}
        onChangeEvent={(event: React.ChangeEvent<HTMLInputElement>) => {
          pass.current = event.target.value;
          validate();
        }}
      />

      <ListedBtn
        key="submitBtn"
        callback={submitHandler}
        theme={isValid ? BUTTON_THEME.GREEN : BUTTON_THEME.RED}
        disabled={!isValid}
        width="100%"
      >
        Готово
      </ListedBtn>

      <AuthMessage>
        {action === ENTER_WINDOW.AUTHENTICATE ? (
          <>
            <span>Нет аккаунта?</span>
            &nbsp;
            <ThinButton callback={toggleToRegistry}>Создать аккаунт</ThinButton>
          </>
        ) : (
          <>
            <span>Уже зарегестрированы?</span>
            &nbsp;
            <ThinButton callback={toggleToAuth}>Войти</ThinButton>
          </>
        )}
      </AuthMessage>
    </AuthBox>
  );
};

export default Auth;
