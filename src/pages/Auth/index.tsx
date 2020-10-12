import React, {useCallback, useRef, useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {PageAction} from "@/store/page/action";
import {UserAction} from "@/store/user/action";

import {BUTTON_THEME, PAGES} from "@my-app/constants";

import PageSize from "@/styled/PageSize";
import Spacer from "@/styled/Spacer";
import Button from "@/components/Button";
import deal from "@/helpers/deal";
import Input from "@/components/Input";
import SocketAction from "@/web-socket/action";

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
    registration
}
let submitBlocked = false;

function AuthPage() {
    const dispatch = useDispatch();
    const [control, setControl] = useState(view.initial);
    const [isValid, setValid] = useState(false);

    const pass = useRef('');
    const name = useRef('');

    const validate = useCallback(() => {
        setValid(name.current.length > 3 && pass.current.length > 5);
    }, []);

    const submit = useCallback(() => {
        control === view.registration
            ? login('/registration')
            : login('/authentication')
    }, [control]);

    const login = useCallback(async (api) => {
        if (submitBlocked) return;
        submitBlocked = true;

        const url = window.location.origin + api;
        const body = {
            nick_name: name.current,
            password: pass.current,
        };
        try {
            const resp = await deal({url, body});
            const user_id = parseInt(resp.user_id);
            const experience = parseInt(resp.experience);

            SocketAction.auth(user_id);

            dispatch(UserAction.setUser({
                    user_id: user_id,
                    experience: experience,
                    nick_name: name.current,
                })
            );
            dispatch(PageAction.set(PAGES.MAIN));
        } catch (error) {
            submitBlocked = false;
            console.log(error);
        }
    }, []);

    const goToAuth = (
        <ListedBtn key={'authBtn'}
                   theme={BUTTON_THEME.light}
                   size={'100%'}
                   callback={() => {
                       setControl(view.authenticate)
                   }}>
            Войти
        </ListedBtn>
    );
    const goToRegistry = (
        <ListedBtn key={'registryBtn'}
                   theme={BUTTON_THEME.dark}
                   size={'100%'}
                   callback={() => {
                       setControl(view.registration)
                   }}>
            Создать аккаунт
        </ListedBtn>
    );
    const inputs = (
        <React.Fragment key={"inputs"}>
            <ListedInput type="text"
                         name="nick_name"
                         placeholder="Login"
                         default={name.current}
                         onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                             name.current = event.target.value;
                             validate();
                         }}/>
            <ListedInput type="password"
                         name="password"
                         placeholder="Password"
                         default={pass.current}
                         onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                             pass.current = event.target.value;
                             validate();
                         }}/>
        </React.Fragment>
    );
    const submitBtn = (
        <ListedBtn key={'submitBtn'}
                   callback={submit}
                   theme={isValid ? BUTTON_THEME.green : BUTTON_THEME.red}
                   disabled={!isValid}
                   size={'100%'}>
            Готово
        </ListedBtn>
    );

    return (
        <AuthBox onSubmit={(event) => {
            event.preventDefault();
            submit();
        }}>
            <h1>
                Imaginarium
            </h1>

            <Spacer/>

            {control === view.initial
                ? [goToAuth, goToRegistry]
                : [inputs, submitBtn]}

            {control === view.registration
            && goToAuth}

            {control === view.authenticate
            && goToRegistry}
        </AuthBox>
    )
}

export default AuthPage;
