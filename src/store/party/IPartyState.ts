import { GAME_ACTION } from '@imaginarium/packages/constants';
import { IPlayer, TReward } from '@imaginarium/packages/interfaces';
import { InferValueTypes } from '@imaginarium/packages/types';

type IPartyState = {
  room_id: number | null;
  players: IPlayer[];
  rewards: TReward[];
  question: string | null;
  game_master: boolean;
  game_action: InferValueTypes<typeof GAME_ACTION> | null;
};

export default IPartyState;
