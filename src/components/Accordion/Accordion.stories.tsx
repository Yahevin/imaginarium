import React from 'react';
import { Accordion } from '@/components/Accordion/Accordion';
import { Props } from '@/components/Accordion/Accordion.model';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 300px;
  margin: 50px auto;
`;
const Gradient = styled.div`
  height: 400px;
  background: linear-gradient(rebeccapurple, cornflowerblue);
`;

export default {
  title: 'Component/Accordion',
  component: Accordion,
};

const Template = (args: Props) => (
  <Wrap>
    <Accordion {...args}>
      <Gradient />
    </Accordion>
  </Wrap>
);
// @ts-ignore
export const Primary: { args: Props } = Template.bind({});
Primary.args = {
  config: { friction: 25, mass: 1, precision: 1, tension: 150 },
  isOpen: false,
  children: () => <Gradient />,
};
