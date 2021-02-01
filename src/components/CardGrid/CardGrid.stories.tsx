/* eslint-disable no-magic-numbers */
import React from 'react';
import { CardGrid } from '@/components/CardGrid/CardGrid';
import { TCardGrid } from '@/components/CardGrid/CardGrid.model';
import { ICard } from '@my-app/interfaces';

export default {
  title: 'Component/CardGrid',
  component: CardGrid,
};

const Template = (args: TCardGrid) => <CardGrid {...args} />;
// @ts-ignore
export const Primary: { args: TCardGrid } = Template.bind({});
Primary.args = {
  cards: [
    {
      id: 1,
      img_url: '',
    },
    {
      id: 2,
      img_url: '',
    },
    {
      id: 3,
      img_url: '',
    },
    {
      id: 4,
      img_url: '',
    },
  ],
  setSelect(card_id: ICard['id']) {
    console.log(card_id);
  },
  selected_id: 3,
};
