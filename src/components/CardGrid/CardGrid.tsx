import React from 'react';

import { Grid } from './CardGrid.styles';
import { TCardGrid } from './CardGrid.model';

export const CardGrid: React.FC<TCardGrid> = ({ cards, setSelect, selected_id }) => {
  return (
    <Grid>
      {cards.map((card) => {
        const selected = selected_id === card.id;

        return (
          <img
            key={card.id}
            src={card.img_url}
            className={selected ? 'active' : ''}
            onClick={() => {
              setSelect(card.id);
            }}
            alt="card"
          />
        );
      })}
    </Grid>
  );
};
