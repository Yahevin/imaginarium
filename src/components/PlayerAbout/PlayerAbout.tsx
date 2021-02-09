import React from 'react';
import { Avatar } from '@/components/Avatar/Avatar';
import { AboutInfo, AboutWrap, PlayerName } from '@/components/PlayerAbout/PlayerAbout.styles';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { TPlayerAbout } from '@/components/PlayerAbout/PlayerAbout.model';

export const PlayerAbout: React.FC<TPlayerAbout> = ({ id, nick_name, experience, game_master, score, diff }) => {
  return (
    <AboutWrap>
      <Avatar id={id} nick_name={nick_name} experience={experience} game_master={game_master} />
      <AboutInfo>
        <PlayerName>{nick_name}</PlayerName>
        <ProgressBar score={score} diff={diff} />
      </AboutInfo>
    </AboutWrap>
  );
};

export { AboutWrap as PlayerAboutRef } from '@/components/PlayerAbout/PlayerAbout.styles';
