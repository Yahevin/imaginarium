import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { StartPage } from '@/pages/Start/StartPage';
import { HubPage } from '@/pages/Hub/HubPage';
import { PartyCreate } from '@/pages/PartyCreate/PartyCreate';
import { LobbyPage } from '@/pages/Lobby/LobbyPage';
import { GamePage } from '@/pages/Game/GamePage';
import { ScoresPage } from '@/pages/Scores/ScoresPage';
import { useCookieAuth } from '@/hook/useCoockieAuth';
import { useLeave } from '@/hook/useLeave';
import { Modals } from '@/pages/IndexPage/parts/Modals';

function IndexPage() {
  useCookieAuth();
  useLeave();

  return (
    <>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route exact path="/main" component={HubPage} />
        <Route exact path="/create" component={PartyCreate} />
        <Route exact path="/lobby" component={LobbyPage} />
        <Route exact path="/game" component={GamePage} />
        <Route exact path="/scores" component={ScoresPage} />
      </Switch>
      <Modals />
    </>
  );
}

export default IndexPage;
