import { IPlayer, TReward } from '@my-app/interfaces';

export type TPlayersGrid = {
  players: IPlayer[];
  rewards?: TReward[];
};
