import React from 'react';
import { useSelector } from 'react-redux';
import { TStore } from '@/store/reducer';

import { Grid } from './CardGrid.styles';
import { TCardGrid } from './CardGrid.model';

export const CardGrid: React.FC<TCardGrid> = ({ cards, select }) => {
  const selectedHand = useSelector((store: TStore) => store.cardsReducer.selectedHand);
  const selectedTable = useSelector((store: TStore) => store.cardsReducer.selectedTable);

  return (
    <Grid>
      {cards.map((card) => {
        const selected = selectedHand === card.id || selectedTable === card.id;

        return (
          <img
            key={card.id}
            src={card.img_url}
            className={selected ? 'active' : ''}
            onClick={() => {
              select(card.id);
            }}
            alt="card"
          />
        );
      })}
    </Grid>
  );
};
