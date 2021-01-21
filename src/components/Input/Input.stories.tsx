import React from 'react';
import { Input } from '@/components/Input/Input';
import { TInput } from '@/components/Input/Input.model';
import { INPUT_THEME } from '@my-app/constants';

export default {
  title: 'Component/Input',
  component: Input,
};

const Template = (args: TInput) => <Input {...args} />;

export const Primary: { args: TInput } = Template.bind({});
Primary.args = {
  disabled: false,
  name: 'test_input',
  className: '',
  onChangeEvent: (e) => {
    console.log(e);
  },
  theme: INPUT_THEME.LIGHT,
  width: '100%',
};
