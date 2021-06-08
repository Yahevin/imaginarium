import { IPlayer } from '@imaginarium/packages/interfaces';

export interface IGameAbout {
  id: number;
  created_at: number;
  game_name: string;
  players: IPlayer[];
}
