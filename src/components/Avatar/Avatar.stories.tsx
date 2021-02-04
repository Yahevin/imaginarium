/* eslint-disable no-magic-numbers */
import React from 'react';
import { Avatar } from '@/components/Avatar/Avatar';
import { IAvatar } from '@/components/Avatar/Avatar.model';

export default {
  title: 'Component/Avatar',
  component: Avatar,
};

const Template = (args: IAvatar) => <Avatar {...args}>123</Avatar>;
// @ts-ignore
export const Primary: { args: IAvatar } = Template.bind({});
Primary.args = {
  id: 1,
  nick_name: 'Test',
  experience: 100,
};
