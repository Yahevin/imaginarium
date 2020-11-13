import React from "react";
import GameAbout from "@/pages/Hub/parts/GameAbout";
import {useSelector} from "react-redux";
import useFetch from "@/helpers/useFetch";
import {TStore} from "@/store/reducer";
import {ROUTES} from "@my-app/constants";
import {IGameAbout} from "@my-app/interfaces";
import styled from "styled-components";

//TODO create 'loading' component

function RecentGames() {
    const user_id = useSelector(((store: TStore) => store.userReducer.user_id));
    const {games}: { games: IGameAbout[] } = useFetch({
        url: ROUTES.GET_RECENT_GAMES,
        body: {user_id}
    }) || {games: []};

    return (
        <div>
            {games.length > 0
                ? games.map((item) => <GameAbout key={item.id} {...item}/>)
                : <h3>empty</h3>
            }
        </div>
    )
}

export default RecentGames;
