import React from 'react';
import { HeaderInGame } from '@/components/HeaderInGame/HeaderInGame';
import { Provider } from 'react-redux';
import store from '../../store';

export default {
  title: 'Component/HeaderInGame',
  component: HeaderInGame,
};

const Template = () => (
  <Provider store={store}>
    <HeaderInGame>
      <h4>Header</h4>
    </HeaderInGame>
  </Provider>
);
export const Primary = Template.bind({});
