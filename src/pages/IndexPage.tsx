import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { StartPage } from '@/pages/Start/StartPage';
import { HubPage } from '@/pages/Hub/HubPage';
import { PartyCreate } from '@/pages/PartyCreate/PartyCreate';
import { LobbyPage } from '@/pages/Lobby/LobbyPage';
import { GamePage } from '@/pages/Game/GamePage';
import { ScoresPage } from '@/pages/Scores/ScoresPage';
import deal from '@/helpers/deal';
import { TAuthVerify } from '@my-app/interfaces';
import { ROUTES } from '@my-app/constants';
import { UserAction } from '@/store/user/action';
import { useDispatch } from 'react-redux';

function IndexPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const { hash } = window.location;
    if (hash.length === 0) return;

    (async () => {
      const { user_id, nick_name, experience } = await deal<TAuthVerify>({
        url: ROUTES.AUTH_VERIFY,
      });

      dispatch(
        UserAction.setUser({
          user_id,
          nick_name,
          experience,
        }),
      );

      history.replace(hash.replace(/#/, ''));
    })();
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={StartPage} />
      <Route exact path="/main" component={HubPage} />
      <Route exact path="/create" component={PartyCreate} />
      <Route exact path="/lobby" component={LobbyPage} />
      <Route exact path="/game" component={GamePage} />
      <Route exact path="/scores" component={ScoresPage} />
    </Switch>
  );
}

export default IndexPage;
