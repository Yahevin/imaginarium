import { GAME_ACTION } from '@my-app/constants';
import { IPlayer } from '@my-app/interfaces';
import { InferValueTypes } from '@my-app/types';

type IPartyState = {
  room_id: number | null;
  players: IPlayer[];
  question: string | null;
  game_master: boolean;
  game_action: InferValueTypes<typeof GAME_ACTION> | null;
};

export default IPartyState;
