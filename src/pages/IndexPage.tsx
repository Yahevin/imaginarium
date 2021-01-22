import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import AuthPage from '@/pages/Auth';
import StartPage from '@/pages/Start';
import HubPage from '@/pages/Hub';
import PartyCreate from '@/pages/Party_create';
import LobbyPage from '@/pages/Lobby';
import Game from '@/pages/Game';
import Scores from '@/pages/Scores';

function IndexPage() {
  const history = useHistory();

  useEffect(() => {
    const { hash } = window.location;
    if (hash.length === 0) return;
    history.push(hash.replace(/#/, ''));
  });

  return (
    <Switch>
      <Route exact path="/" component={StartPage} />
      <Route exact path="/auth" component={AuthPage} />
      <Route exact path="/main" component={HubPage} />
      <Route exact path="/create" component={PartyCreate} />
      <Route exact path="/lobby" component={LobbyPage} />
      <Route exact path="/game" component={Game} />
      <Route exact path="/scores" component={Scores} />
    </Switch>
  );
}

export default IndexPage;
