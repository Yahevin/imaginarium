import React from 'react';
import { Button } from '@/components/Button/Button';
import { TButton } from '@imaginarium/packages/interfaces';
import { BUTTON_THEME } from '@imaginarium/packages/constants';

export default {
  title: 'Component/Button',
  component: Button,
};

const Template = (args: TButton) => <Button {...args}>123</Button>;
// @ts-ignore
export const Primary: { args: TButton } = Template.bind({});
Primary.args = {
  disabled: false,
  className: '',
  callback: () => {},
  theme: BUTTON_THEME.RED,
  width: '100%',
  children: 'test',
};
