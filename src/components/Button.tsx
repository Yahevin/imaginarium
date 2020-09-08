import React, {useMemo} from "react";
import styled from "styled-components";
import IButton from "@/interfaces/IButton";
import getButtonTheme from "@/helpers/getButtonTheme";

const StyledButton = styled.button<{size: 'auto' | '100%', bg: string, color: string}>`
    width: ${props => props.size };
    background-color: ${props => props.bg};
    color: ${props => props.color};
`;

function Button(props:IButton) {
    const {bg, color} = useMemo(() => getButtonTheme(props.theme), [props.theme]);

    const clickHandler = (event:React.SyntheticEvent) => {
        props.callback();
    };

    return (
        <StyledButton
            onClick={clickHandler}
            size={props.size}
            color={color}
            bg={bg}
        >
            {props.children}
        </StyledButton>
    )

}

export default Button;
