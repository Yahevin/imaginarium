import React from 'react';
import { TModal } from '@/components/Modal/Modal.model';
import { Modal } from '@/components/Modal/Modal';

export default {
  title: 'Component/Modal',
  component: Modal,
};

const Template = (args: TModal) => <Modal {...args} />;
// @ts-ignore
export const Primary: { args: TModal } = Template.bind({});
Primary.args = {
  children: <h1>Hello world</h1>,
  close: () => {
    console.log('close');
  },
  isOpen: true,
};
