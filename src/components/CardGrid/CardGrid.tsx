import React from 'react';

import { Grid, Grid__Img, Grid__Item } from './CardGrid.styles';
import { TCardGrid } from './CardGrid.model';

export const CardGrid: React.FC<TCardGrid> = ({ cards, setSelect, selected_id }) => {
  return (
    <Grid>
      {cards.map((card) => {
        const selected = selected_id === card.id;

        return (
          <Grid__Item isActive={selected} key={card.id}>
            <Grid__Img
              src={card.img_url}
              onClick={() => {
                setSelect(card.id);
              }}
              alt="card"
            />
          </Grid__Item>
        );
      })}
    </Grid>
  );
};
