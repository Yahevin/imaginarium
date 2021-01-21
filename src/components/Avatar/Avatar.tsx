/* eslint-disable no-magic-numbers */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { Box, Face, Level, SubBox } from '@/components/Avatar/Avatar.styles';
import { IAvatar } from '@/components/Avatar/Avatar.model';
import { LEVEL_COST } from '@my-app/constants/parts/LEVEL_COST';

export const Avatar = ({ nick_name, experience, className, game_master = false, fontRate = 0.5 }: IAvatar) => {
  const userName = useMemo(() => nick_name[0] + nick_name[nick_name.length - 1], [nick_name]);
  const userLevel = useMemo(() => Math.floor(experience / LEVEL_COST), [experience]);

  const $face = useRef(null);

  const setFontSize = useCallback(() => {
    if ($face.current === null) return;

    const height = $face.current.offsetHeight;
    $face.current.style.setProperty('font-size', `${height * fontRate}px`);
  }, [$face, fontRate]);

  useEffect(() => {
    setFontSize();
    window.addEventListener('resize', setFontSize);

    return () => {
      window.removeEventListener('resize', setFontSize);
    };
  });

  return (
    <Box className={className}>
      <SubBox>
        <Face ref={$face} fontRate={fontRate} game_master={game_master}>
          {userName}
        </Face>
        <Level>{userLevel}</Level>
      </SubBox>
    </Box>
  );
};
