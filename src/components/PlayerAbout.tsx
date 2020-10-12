import React from "react";
import Avatar from "@/components/Avatar";
import {IPlayer} from "interfaces";

function PlayerAbout({nick_name, experience, game_master, score} : IPlayer) {
    return (
        <div>
            {game_master && (<h1>Game master</h1>)}

            <Avatar nick_name={nick_name} experience={experience}/>
            <div>{score} / 100</div>
        </div>

    )
}

export default PlayerAbout;
