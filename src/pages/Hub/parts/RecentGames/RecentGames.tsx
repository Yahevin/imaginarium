import React from 'react';
import { useSelector } from 'react-redux';

import { useFetch } from '@/hook/useFetch';
import { TStore } from '@/store/reducer';
import { ROUTES } from '@my-app/constants';
import { IGameAbout } from '@my-app/interfaces';
import {
  GameCreated,
  GamesList,
  GamesList__item,
  GameTitle,
  PartnersList,
  PartnersList__item,
} from '@/pages/Hub/parts/RecentGames/RecentGames.styles';
import { FlexRowBox } from '@/styled/Flex';
import Spacer from '@/styled/Spacer';
import { getDate } from '@/helpers/getDate';

// TODO create 'loading' component

export const RecentGames = () => {
  const user_id = useSelector((store: TStore) => store.userReducer.user_id);
  const { games }: { games: IGameAbout[] } = useFetch(
    {
      url: ROUTES.GET_RECENT_GAMES,
      body: { user_id },
    },
    { games: [] },
  );

  return (
    <GamesList>
      {games.length > 0 ? (
        games.map((game) => (
          <GamesList__item key={game.id}>
            <FlexRowBox>
              <GameTitle>
                #{game.id}&nbsp;{game.game_name}
              </GameTitle>
              <Spacer />
              <GameCreated>Создана:&nbsp;{getDate(game.created_at)}</GameCreated>
            </FlexRowBox>
            <PartnersList>
              {game.players.map((player) => (
                <PartnersList__item key={player.id} isGameMaster={player.game_master}>
                  {player.nick_name}
                </PartnersList__item>
              ))}
            </PartnersList>
          </GamesList__item>
        ))
      ) : (
        <h3>No recent games</h3>
      )}
    </GamesList>
  );
};
