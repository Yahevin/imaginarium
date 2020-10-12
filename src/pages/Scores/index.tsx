import React, {useCallback, useEffect, useMemo} from "react";
import {Menu, Menu__item} from "@/styled/Menu";
import Button from "@/components/Button";
import {BUTTON_THEME, GAME_ACTION, PAGES} from "@my-app/constants";
import SocketAction from "@/web-socket/action";
import {useDispatch, useSelector} from "react-redux";
import {TStore} from "@/store/reducer";
import styled from "styled-components";
import {PageAction} from "@/store/page/action";
import PlayerAbout from "@/components/PlayerAbout";

const Grid = styled.div`
  margin: 0 auto;
  height: 60vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;
`;

function Scores() {
    const dispatch = useDispatch();
    const players = useSelector((store: TStore) => store.partyReducer.players);
    const game_action = useSelector((store: TStore) => store.partyReducer.game_action);

    useEffect(() => {
        if (game_action === GAME_ACTION.start) {
            dispatch(PageAction.set(PAGES.GAME))
        }
    }, [game_action]);

    const nextRound = useCallback(() => {
        SocketAction.nextRound();
    }, []);

    const PlayersGrid = useMemo(() => {
        return players.map((player) => <PlayerAbout {...player} key={player.nick_name}/>)
    }, [players]);

    return (
        <Menu>
            <Menu__item>
                <Grid>
                    {PlayersGrid}
                </Grid>
            </Menu__item>
            <Menu__item>
                <Button callback={nextRound}
                        theme={BUTTON_THEME.light}
                        size={"auto"}>
                    Next round
                </Button>
            </Menu__item>
        </Menu>
    )
}

export default Scores;
