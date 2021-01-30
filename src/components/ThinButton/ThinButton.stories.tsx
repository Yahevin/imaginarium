import React from 'react';
import { ThinButton } from '@/components/ThinButton/ThinButton';
import { T_ThinButton } from '@/components/ThinButton/ThinButton.model';

export default {
  title: 'Component/ThinButton',
  component: ThinButton,
};

const Template = (args: T_ThinButton) => (
  <div>
    Before text <ThinButton {...args}>Thin Button</ThinButton> After text
  </div>
);

// @ts-ignore
export const Primary: { args: T_ThinButton } = Template.bind({});
// @ts-ignore
Primary.args = {
  callback: (event) => {
    console.log(event);
  },
};
