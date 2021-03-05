import { DB_user_room } from '@my-app/interfaces';

type Props = {
  activePlayersIdList: number[];
  players_list: DB_user_room[];
};

export const findActivePlayers = ({ activePlayersIdList, players_list }: Props) => {
  return players_list.filter((player) => {
    return !!activePlayersIdList.indexOf(player.id);
  });
};
