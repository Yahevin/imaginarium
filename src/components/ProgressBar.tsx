import React from "react";
import styled, {css} from "styled-components";
import COLOR from "@/constants/Color";
import Font_small from "@/styled/Font_small";

const Absolute = css`
    position: absolute;
    left: 0;
    top: 0;
`;
const Bar = styled.div`
    width: 100%;
    height: 16px;
    background: ${COLOR.passive};
    border-radius: 8px;
    position: relative;
`;
const Progress = styled.div<{width: number}>`
    ${Absolute};
    width: calc(${props => props.width}% + 8px);
    height: 100%;
    border-radius: 8px;
    background: ${COLOR.active};
`;
const Digit = styled.span`
    ${Absolute};
    ${Font_small};
    color: ${COLOR.white};
    margin: 0 0 0 8px;
`;

function ProgressBar({score}: {score:number}) {
    const remainder = score % 100;

    return (
        <Bar>
            <Progress width={remainder}/>
            <Digit>
                {remainder} / 100
            </Digit>
        </Bar>
    )
}

export default ProgressBar;
