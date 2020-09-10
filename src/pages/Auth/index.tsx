import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {PageAction} from "@/store/page/action";

import ButtonTheme from "@/constants/ButtonTheme";
import PAGES from "@/constants/Pages";

import PageSize from "@/styled/PageSize";
import Spacer from "@/styled/Spacer";
import Button from "@/components/Button";
import deal from "@/helpers/deal";
import Input from "@/components/Input";

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
        const url = window.location.origin + api;
        const body = {
            nick_name: name.current,
            password: pass.current,
        };
        const resp = await deal(url, 'POST', body);
        if (resp.hasOwnProperty('success') && resp.success) {
            dispatch(PageAction.set(PAGES.MAIN));
        } else {
            console.log(resp.error);
        }
    }, []);

    const goToAuth = (
        <ListedBtn key={'authBtn'}
                   theme={ButtonTheme.light}
                   size={'100%'}
                   callback={() => {
                       setControl(view.authenticate)
                   }}>
            Войти
        </ListedBtn>
    );
    const goToRegistry = (
        <ListedBtn key={'registryBtn'}
                   theme={ButtonTheme.dark}
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
                         onChange={(event) => {
                             name.current = event.target.value;
                             validate();
                         }}/>
            <ListedInput type="password"
                         name="password"
                         placeholder="Password"
                         default={pass.current}
                         onChange={(event) => {
                             pass.current = event.target.value;
                             validate();
                         }}/>
        </React.Fragment>
    );
    const submitBtn = (
        <ListedBtn key={'submitBtn'}
                   callback={submit}
                   theme={isValid ? ButtonTheme.green : ButtonTheme.red}
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
