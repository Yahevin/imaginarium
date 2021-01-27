/* eslint-disable no-magic-numbers */
import React, { useCallback, useMemo } from 'react';

import { Box, Face, Level, SubBox } from '@/components/Avatar/Avatar.styles';
import { IAvatar } from '@/components/Avatar/Avatar.model';
import { LEVEL_COST } from '@my-app/constants/parts/LEVEL_COST';

export const Avatar = ({ nick_name, experience, className, game_master = false, fontRate = 0.5 }: IAvatar) => {
  const userName = useMemo(() => nick_name[0] + nick_name[nick_name.length - 1], [nick_name]);
  const userLevel = useMemo(() => Math.floor(experience / LEVEL_COST), [experience]);

  const faceRef = useCallback(
    (node) => {
      if (node.current === null) return;

      const height = node.current.offsetHeight;
      node.current.style.setProperty('font-size', `${height * fontRate}px`);
    },
    [fontRate],
  );

  return (
    <Box className={className}>
      <SubBox>
        <Face ref={faceRef} fontRate={fontRate} game_master={game_master}>
          {userName}
        </Face>
        <Level>{userLevel}</Level>
      </SubBox>
    </Box>
  );
};
