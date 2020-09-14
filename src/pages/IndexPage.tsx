import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {Route, Switch, useHistory} from "react-router-dom";

import {TStore} from "@/store/reducer";

import AuthPage from "@/pages/Auth";
import StartPage from "@/pages/Start";
import HubPage from "@/pages/Hub";
import NewRoom from "@/pages/New_room";



function IndexPage() {
    const history = useHistory();
    const page = useSelector((state:TStore) => state.pageReducer.page);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash.length === 0) return;
        history.push(hash.replace(/#/, ''));
    });

    useEffect(() => {
        history.push(page);
    }, [page]);

    return (
        <Switch>
            <Route exact path={'/'} component={StartPage}/>
            <Route exact path={'/auth'} component={AuthPage}/>
            <Route exact path={'/main'} component={HubPage}/>
            <Route exact path={'/new_room'} component={NewRoom}/>
        </Switch>
    )
}


export default IndexPage;
