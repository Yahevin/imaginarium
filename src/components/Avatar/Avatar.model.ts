import { IPerson } from '@imaginarium/packages/interfaces';
import { MergeTypes } from '@imaginarium/packages/types';

export type IAvatar = MergeTypes<IPerson, { className?: string; fontRate?: number; game_master?: boolean }>;
