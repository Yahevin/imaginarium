import React from 'react';
import { Avatar } from '@/components/Avatar/Avatar';
import { IPlayer } from '@my-app/interfaces';
import { AboutInfo, AboutWrap, PlayerName } from '@/components/PlayerAbout/PlayerAbout.styles';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';

export const PlayerAbout: React.FC<IPlayer> = ({ id, nick_name, experience, game_master, score }) => {
  return (
    <AboutWrap>
      <Avatar id={id} nick_name={nick_name} experience={experience} game_master={game_master} />
      <AboutInfo>
        <PlayerName>{nick_name}</PlayerName>
        <ProgressBar score={score} />
      </AboutInfo>
    </AboutWrap>
  );
};
