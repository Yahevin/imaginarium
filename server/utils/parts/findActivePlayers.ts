import { DB_user_room } from '@imaginarium/packages/interfaces';

type Props = {
  activePlayersIdList: number[];
  playersList: DB_user_room[];
};

export const findActivePlayers = ({ activePlayersIdList, playersList }: Props) => {
  return playersList.filter((player) => {
    return activePlayersIdList.some((id) => id === player.id);
  });
};
