/* eslint-disable no-magic-numbers */
import React from 'react';
import { CardGrid } from '@/components/CardGrid/CardGrid';
import { TCardGrid } from '@/components/CardGrid/CardGrid.model';
import { ICard } from '@imaginarium/packages/interfaces';

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
      img_url: 'https://i.ibb.co/stcm9nq/79c5ac8d7895b7cccd6f204b71cb1dc9.jpg',
    },
    {
      id: 2,
      img_url: 'https://i.ibb.co/bsWk2kS/62f7859f2e5f6a1614edf908d7797cd8.jpg',
    },
    {
      id: 3,
      img_url: 'https://i.ibb.co/F8CSTYn/55b775757083bc2c3a14a5ca98915b48.jpg',
    },
    {
      id: 4,
      img_url: 'https://i.ibb.co/MfQyZX2/38e9b1f8633d9751b906502fd03800c5.jpg',
    },
    {
      id: 5,
      img_url: 'https://i.ibb.co/rkLF8gY/9d041fe137e84b728ffa0c78bee92ced.jpg',
    },
    {
      id: 6,
      img_url: 'https://i.ibb.co/LxVgn0g/8eae0e4a09f0c73efcebd8de8d1662e6.jpg',
    },
  ],
  setSelect(card_id: ICard['id']) {
    console.log(card_id);
  },
  selected_id: 3,
};
