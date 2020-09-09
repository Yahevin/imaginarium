import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch, useHistory} from "react-router-dom";
import ButtonTheme from "@/constants/ButtonTheme";
import PAGES from "@/constants/Pages";
import IStore from "@/interfaces/IStore";

import {PageAction} from "@/store/page/action";

import Button from "@/components/Button";
import Auth from "@/pages/Auth";


function IndexPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const page = useSelector((state:IStore) => state.pageReducer.page);

    const startHandler = useCallback(() => {
        dispatch(PageAction.set(PAGES.AUTH));
    }, []);

    useEffect(()=>{
        const hash = window.location.hash;
        if (hash.length === 0) return;
        history.push(hash.replace(/#/,''));
    });

    useEffect(()=>{
        console.log('update');
        history.push(page);
    },[page]);

    return (
        <Switch>
            <Route exact path={'/'}>
                <Button callback={startHandler}
                        theme={ButtonTheme.green}
                        size={'auto'}>
                    Start
                </Button>
            </Route>
            <Route exact path={'/auth'}>
                <Auth/>
            </Route>
            <Route exact path={'/main'}>
                <h1>Hello</h1>
            </Route>
        </Switch>
    )
}



export default IndexPage;
