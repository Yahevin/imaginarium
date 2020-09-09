import React from "react";
import styled from "styled-components";

import PageSize from "@/styled/PageSize";
import Flex__c_sb from "@/styled/flex/Flex__c_sb";

import ButtonTheme from "@/constants/ButtonTheme";

import Button from "@/components/Button";

const AuthBox = styled.article`
  ${PageSize};
  ${Flex__c_sb};
`;

function AuthPage() {

    const enter = () => {

    };

    const registration = () => {

    };

    return (
        <AuthBox>
            <h1>
                Imaginarium
            </h1>

            <div>
                <Button callback={enter}
                        theme={ButtonTheme.light}
                        size={'100%'} >
                    Войти
                </Button>

                <Button callback={registration}
                        theme={ButtonTheme.dark}
                        size={'100%'} >
                    Создать аккаунт
                </Button>
            </div>
        </AuthBox>
    )
}

export default AuthPage;
