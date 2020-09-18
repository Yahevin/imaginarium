import React, { useEffect} from "react";
import {useSelector} from "react-redux";
import {Route, Switch, useHistory} from "react-router-dom";

import {TStore} from "@/store/reducer";

import AuthPage from "@/pages/Auth";
import StartPage from "@/pages/Start";
import HubPage from "@/pages/Hub";
import PartyCreate from "@/pages/Party_create";
import LobbyPage from "@/pages/Lobby";


const reloadPrepare = (event: KeyboardEvent)=>{
    if (event.code !== 'MetaLeft') return;

    const path = window.location.pathname.slice(1);

    window.location.pathname = '';
    window.location.hash = path;
};

function IndexPage() {
    const history = useHistory();
    const page = useSelector((state: TStore) => state.pageReducer.page);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash.length === 0) return;
        history.push(hash.replace(/#/, ''));
    });

    useEffect(() => {
        history.push(page);
    }, [page]);

    useEffect(()=>{
       window.addEventListener('keydown',reloadPrepare);

       return ()=>{
           window.removeEventListener('keydown',reloadPrepare);
       }
    });

    return (
        <Switch>
            <Route exact path={'/'} component={StartPage}/>
            <Route exact path={'/auth'} component={AuthPage}/>
            <Route exact path={'/main'} component={HubPage}/>
            <Route exact path={'/create'} component={PartyCreate}/>
            <Route exact path={'/lobby'} component={LobbyPage}/>
        </Switch>
    )
}


export default IndexPage;
