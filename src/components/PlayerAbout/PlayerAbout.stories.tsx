/* eslint-disable no-magic-numbers */
import React from 'react';
import { PlayerAbout } from '@/components/PlayerAbout/PlayerAbout';
import { IPlayer } from '@my-app/interfaces';

export default {
  title: 'Component/PlayerAbout',
  component: PlayerAbout,
};

const Template = (args: IPlayer) => <PlayerAbout {...args} />;
// @ts-ignore
export const Primary: { args: IPlayer } = Template.bind({});
Primary.args = {
  id: 1,
  nick_name: 'Test',
  experience: 100,
  game_master: false,
  score: 20,
};
