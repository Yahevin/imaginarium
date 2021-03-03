import React, { useMemo } from 'react';
import { TPlayersGrid } from '@/components/PlayersGrid/PlayersGrid.model';
import { Grid, Grid__item } from '@/components/PlayersGrid/PlayersGrid.styles';
import { PlayerAbout } from '@/components/PlayerAbout/PlayerAbout';

export const PlayersGrid: React.FC<TPlayersGrid> = ({ players, rewards }) => {
  const rewardArr = useMemo(() => rewards ?? [], [rewards]);

  const playersWithRewards = useMemo(() => {
    return players.map((player) => {
      return { ...player, diff: rewardArr?.filter((reward) => reward.player_id === player.id)[0]?.diff };
    });
  }, [players, rewardArr]);

  return (
    <Grid>
      {playersWithRewards.map((item) => (
        <Grid__item key={item.id}>
          <PlayerAbout {...item} />
        </Grid__item>
      ))}
    </Grid>
  );
};
