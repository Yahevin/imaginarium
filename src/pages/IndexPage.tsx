import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { StartPage } from '@/pages/Start/StartPage';
import { HubPage } from '@/pages/Hub/HubPage';
import { PartyCreate } from '@/pages/PartyCreate/PartyCreate';
import { LobbyPage } from '@/pages/Lobby/LobbyPage';
import { GamePage } from '@/pages/Game/GamePage';
import { ScoresPage } from '@/pages/Scores/ScoresPage';

function IndexPage() {
  const history = useHistory();

  useEffect(() => {
    const { hash } = window.location;
    if (hash.length === 0) return;
    history.replace(hash.replace(/#/, ''));
  });

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
