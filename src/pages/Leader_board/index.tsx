import React, {useCallback, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {Menu, Menu__item} from "@/styled/Menu";
import Button from "@/components/Button";
import ButtonTheme from "@/constants/ButtonTheme";
import SocketAction from "@/web-socket/action";
import GAME_ACTION from "@/constants/GAME_ACTION";
import {useSelector} from "react-redux";
import {TStore} from "@/store/reducer";

function LeaderBoard() {
    const history = useHistory();
    const game_action = useSelector((store: TStore) => store.partyReducer.game_action);

    useEffect(()=>{
        if (game_action === GAME_ACTION.start) {
            history.push('/game')
        }
    }, [game_action]);

    const nextRound = useCallback(()=>{
        SocketAction.nextRound();
    }, []);

    return (
        <Menu>
            <Menu__item>
                <Button callback={nextRound}
                        theme={ButtonTheme.light}
                        size={"auto"}>
                    Next round
                </Button>
            </Menu__item>
        </Menu>
    )
}

export default LeaderBoard;
