import { IPerson } from '@my-app/interfaces';
import { MergeTypes } from '@my-app/types/parts/MergeTypes';

export type IAvatar = MergeTypes<IPerson, { className?: string; fontRate?: number; game_master?: boolean }>;
