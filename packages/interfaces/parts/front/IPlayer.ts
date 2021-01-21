import { MergeTypes } from '@my-app/types/parts/MergeTypes';
import { IPerson } from './IPerson';

export type IPlayer = MergeTypes<
  IPerson,
  {
    score: number;
    game_master: boolean;
  }
>;
