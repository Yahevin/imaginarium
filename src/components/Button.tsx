import React from "react";
import styled from "styled-components";
import {IButton} from "@my-app/interfaces";
import {COLOR} from "@my-app/constants";
import getButtonTheme from "@/helpers/getButtonTheme";

const StyledButton = styled.button<{ size: 'auto' | '100%', bg: string, color: string }>`
    background-color: ${props => props.bg};
    color: ${props => props.color};
    width: ${props => props.size};
    max-width: 800px;
    padding: 8px 12px;
    border-radius: 10px;
    display: block;
    border: 1px solid ${COLOR.slate};
    transition: all 0.3s;
`;

function Button(props: IButton): JSX.Element {
    const {bg, color} =  getButtonTheme(props.theme)
    const clickHandler = (event: React.SyntheticEvent) => {
        props.callback();
    };

    return (
        <StyledButton
            onClick={clickHandler}
            className={props.className}
            disabled={props.disabled || false}
            size={props.size}
            color={color}
            bg={bg}
        >
            {props.children}
        </StyledButton>
    )

}

export default Button;
