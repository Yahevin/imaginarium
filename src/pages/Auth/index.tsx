import React, {useCallback, useRef, useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {PageAction} from "@/store/page/action";

import ButtonTheme from "@/constants/ButtonTheme";
import PAGES from "@/constants/Pages";

import PageSize from "@/styled/PageSize";
import Spacer from "@/styled/Spacer";
import Button from "@/components/Button";
import deal from "@/helpers/deal";

const ListedBtn = styled(Button)``;

const AuthBox = styled.article`
  ${PageSize};
  height: auto;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  & > ${ListedBtn} + ${ListedBtn} {
    margin: 40px 0 0 0;
  }
`;

enum controlButtons {
    initial,
    authenticate,
    registration
}

function AuthPage() {
    const dispatch = useDispatch();
    const [control, setControl] = useState(controlButtons.initial);
    const [valid, setValid] = useState(false);

    const password = useRef(null);
    const nick_name = useRef(null);

    const createAccount = useCallback(async () => {
        const url = window.location.origin + '/registration';
        const body = {
            nick_name: nick_name.current.value,
            password: password.current.value,
        };
        const resp = await deal(url, 'POST', body);

        if (resp.hasOwnProperty('success') && resp.success) {
            dispatch(PageAction.set(PAGES.MAIN));
        }
    }, []);

    const enterAccount = useCallback(() => {
    }, []);

    const validateRegistry = useCallback(() => {
        console.log('validateRegistry');
        setValid(true);
    }, []);

    const startRegistry = useCallback(() => {
        setControl(controlButtons.registration);
    }, []);

    const startAuth = useCallback(() => {
        setControl(controlButtons.authenticate);
    }, []);

    const getBack = useCallback(() => {
        setControl(controlButtons.initial);
    }, []);

    const initial = () => (
        <>
            <ListedBtn callback={startAuth}
                       theme={ButtonTheme.light}
                       size={'100%'}>
                Войти
            </ListedBtn>

            <ListedBtn callback={startRegistry}
                       theme={ButtonTheme.dark}
                       size={'100%'}>
                Создать аккаунт
            </ListedBtn>
        </>
    );

    const authenticate = () => (
        <>
            <input type="text"
                   name="nick_name"
                   ref={nick_name}/>
            <input type="password"
                   name="password"
                   ref={password}/>

            <ListedBtn callback={enterAccount}
                       theme={valid ? ButtonTheme.green : ButtonTheme.red}
                       size={'100%'}>
                Готово
            </ListedBtn>

            <ListedBtn callback={startRegistry}
                       theme={ButtonTheme.dark}
                       size={'100%'}>
                Создать аккаунт
            </ListedBtn>
        </>
    );

    const registration = () => (
        <>

            <input type="text"
                   name="nick_name"
                   ref={nick_name}
                   onBlur={validateRegistry}/>
            <input type="password"
                   name="password"
                   ref={password}
                   onBlur={validateRegistry}/>

            <ListedBtn callback={createAccount}
                       theme={valid ? ButtonTheme.green : ButtonTheme.red}
                       size={'100%'}>
                Готово
            </ListedBtn>

            <ListedBtn callback={startAuth}
                       theme={ButtonTheme.dark}
                       size={'100%'}>
                Войти в аккаунт
            </ListedBtn>
        </>
    );

    const ButtonBox = () => { switch(control) {
            case controlButtons.initial: {
                return initial();
            }
            case controlButtons.authenticate: {
                return authenticate();
            }
            case controlButtons.registration: {
                return registration();
            }
        }
    };



    return (
        <AuthBox>
            <h1>
                Imaginarium
            </h1>

            <Spacer/>

            <ButtonBox/>
        </AuthBox>
    )
}

export default AuthPage;
