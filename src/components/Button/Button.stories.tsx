import React from 'react';
import { Button } from '@/components/Button/Button';
import { TButton } from '@my-app/interfaces';
import { BUTTON_THEME } from '@my-app/constants';

export default {
  title: 'Component/Button',
  component: Button,
};

const Template = (args: TButton) => <Button {...args}>123</Button>;

export const Primary = Template.bind({});
Primary.args = {
  disabled: false,
  className: '',
  callback: () => {},
  theme: BUTTON_THEME.RED,
  width: '100%',
};
