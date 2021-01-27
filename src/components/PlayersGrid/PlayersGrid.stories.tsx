/* eslint-disable no-magic-numbers */
import React from 'react';
import { TPlayersGrid } from '@/components/PlayersGrid/PlayersGrid.model';
import { PlayersGrid } from '@/components/PlayersGrid/PlayersGrid';

export default {
  title: 'Component/PlayersGrid',
  component: PlayersGrid,
};

const Template = (args: TPlayersGrid) => <PlayersGrid {...args} />;
// @ts-ignore
export const Primary: { args: TPlayersGrid } = Template.bind({});
Primary.args = {
  players: [
    {
      id: 1,
      nick_name: 'First',
      experience: 100,
      game_master: true,
      score: 12,
    },
    {
      id: 2,
      nick_name: 'Second',
      experience: 400,
      game_master: false,
      score: 78,
    },
    {
      id: 3,
      nick_name: 'Third',
      experience: 224,
      game_master: false,
      score: 44,
    },
    {
      id: 4,
      nick_name: 'Fourth',
      experience: 159,
      game_master: false,
      score: 81,
    },
  ],
};
