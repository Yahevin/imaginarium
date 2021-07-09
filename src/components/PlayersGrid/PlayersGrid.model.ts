import { IPlayer, TReward } from '@imaginarium/packages/interfaces';

export type TPlayersGrid = {
  players: IPlayer[];
  rewards?: TReward[];
};
