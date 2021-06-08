import { MergeTypes } from '@imaginarium/packages/types';
import { IPerson } from './IPerson';

export type IPlayer = MergeTypes<
  IPerson,
  {
    score: number;
    game_master: boolean;
  }
>;
