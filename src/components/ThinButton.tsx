import React, {useCallback} from "react";
import styled from "styled-components";
import Font_small from "@/styled/Font_small";
import {IThinButton} from "@my-app/interfaces";
import {COLOR} from "@my-app/constants";

const StyledButton = styled.button`
    ${Font_small};
    color: ${COLOR.active};
    display: block;
    border: 0;
    background: none;
`;

function ThinButton(props:IThinButton) {
    const clickHandler = useCallback(() => {
        props.callback();
    },[]);

    return (
        <StyledButton
            onClick={clickHandler}
            className={props.className}
            disabled={props.disabled || false}
        >
            {props.children}
        </StyledButton>
    )
}

export default ThinButton;
