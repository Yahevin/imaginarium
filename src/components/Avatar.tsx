import React, {useCallback, useEffect, useMemo, useRef} from "react";
import styled, {css} from "styled-components";
import IPlayer from "@/interfaces/IPlayer";
import COLOR from "@/constants/Color";
import IPerson from "@/interfaces/IPerson";

const Box = styled.div`
    flex: 1 1 80px;
    height: auto;
    max-width: 100px;
    min-width: 60px;
`;
const SubBox = styled.div`
    width: 100%;
    height: 100%;
    padding-bottom: 100%;
    position: relative;
`;
const Round = css`
    position: absolute;
    top: 0;
    text-transform: uppercase;
    text-align: center;
    border-radius: 50%;
`;
const Face = styled.div`
    ${Round};
    width: 100%;
    height: 100%;
    left: 0;
    padding: 16% 16%;
    background: ${COLOR.white};
`;
const Level = styled.div`
    ${Round};
    width: 24px;
    height: 24px;
    position: absolute;
    right: 0;
    font-size: 12px;
    line-height: 24px;
    background: ${COLOR.active};
`;

interface IAvatar extends IPerson {
    className?: string;
}

function Avatar({nick_name, experience, className}: IAvatar) {
    const userName = useMemo(() => (nick_name[0] + nick_name[nick_name.length - 1]),
        [nick_name]);
    const userLevel = useMemo(() => (Math.floor(experience / 100)),
        [experience]);

    const $face = useRef(null);

    const setFontSize = useCallback(() => {
        if ($face.current === null) return;

        const height = $face.current.offsetHeight;
        $face.current.style.setProperty('font-size', (height * 0.55 + 'px'));
        $face.current.style.setProperty('line-height', (height * 0.7 + 'px'));
    }, [$face]);

    useEffect(() => {
        setFontSize();
        window.addEventListener('resize', setFontSize);

        return () => {
            window.removeEventListener('resize', setFontSize);
        }
    });

    return (
        <Box className={className}>
            <SubBox>
                <Face ref={$face}>
                    {userName}
                </Face>
                <Level>
                    {userLevel}
                </Level>
            </SubBox>
        </Box>
    )
}

export default Avatar;
