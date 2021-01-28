import React from 'react';
import { useSelector } from 'react-redux';

import useFetch from '@/helpers/useFetch';
import { TStore } from '@/store/reducer';
import { ROUTES } from '@my-app/constants';
import { IGameAbout } from '@my-app/interfaces';
import { GameAbout } from '@/pages/Hub/parts/GameAbout/GameAbout';

// TODO create 'loading' component

export const RecentGames = () => {
  const user_id = useSelector((store: TStore) => store.userReducer.user_id);
  const { games }: { games: IGameAbout[] } = useFetch({
    url: ROUTES.GET_RECENT_GAMES,
    body: { user_id },
  }) || { games: [] };

  return <div>{games.length > 0 ? games.map((item) => <GameAbout key={item.id} {...item} />) : <h3>empty</h3>}</div>;
};
