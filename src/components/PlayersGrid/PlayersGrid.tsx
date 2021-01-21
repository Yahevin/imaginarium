import React from 'react';
import { TPlayersGrid } from '@/components/PlayersGrid/PlayersGrid.model';
import { Grid, Grid__item, Player } from '@/components/PlayersGrid/PlayersGrid.styles';

export const PlayersGrid: React.FC<TPlayersGrid> = ({ players }) => {
  return (
    <Grid>
      {players.map((item) => (
        <Grid__item key={item.id}>
          <Player {...item} />
        </Grid__item>
      ))}
    </Grid>
  );
};
