/* eslint-disable no-magic-numbers */
import React from 'react';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { TProgressBar } from '@/components/ProgressBar/ProgressBar.model';

export default {
  title: 'Component/ProgressBar',
  component: ProgressBar,
};

const Template = (args: TProgressBar) => <ProgressBar {...args} />;

export const Primary: { args: TProgressBar } = Template.bind({});
Primary.args = {
  score: 50,
};
