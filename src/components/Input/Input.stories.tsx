import React from 'react';
import { Input } from '@/components/Input/Input';
import { TInput } from '@/components/Input/Input.model';
import { INPUT_THEME } from '@imaginarium/packages/constants';

export default {
  title: 'Component/Input',
  component: Input,
};
let value = '';

const Template = (args: TInput) => <Input {...args} />;
// @ts-ignore
export const Primary: { args: TInput } = Template.bind({});
Primary.args = {
  disabled: false,
  name: 'test_input',
  className: '',
  value,
  onChangeEvent: (e) => {
    console.log(e);
    value = e.currentTarget.value;
  },
  placeholder: 'placeholder',
  theme: INPUT_THEME.LIGHT,
  width: '100%',
};
