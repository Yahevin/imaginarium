import React, {useCallback} from "react";
import styled from "styled-components";
import IThinButton from "@/interfaces/IThinButton";

import COLOR from "@/constants/Color";
import Font_small from "@/styled/Font_small";

const StyledButton = styled.button`
    ${Font_small};
    color: ${COLOR.active};
    display: block;
    border: 0;
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
