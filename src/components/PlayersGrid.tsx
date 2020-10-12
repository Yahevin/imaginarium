import React, {useMemo} from "react";
import styled from "styled-components";

import Font_small from "@/styled/Font_small";
import {COLOR} from "@my-app/constants";

import Avatar from "@/components/Avatar";
import {IPlayer} from "interfaces";


const Player = styled(Avatar)``;

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-auto-rows: 1fr;
  grid-auto-flow: row;
  grid-gap: 40px 10px;
`;
const Grid__item = styled.div`
  & > ${Player} {
    max-width: 80px;
    margin: 0 auto;
  }
  & > h5 {
    margin: 12px 0 0 0;
    ${Font_small};
    color: ${COLOR.slate};
    text-align: center;
  }
`;

interface IPlayersGrid {
    players: IPlayer[]
}

function PlayersGrid({players}: IPlayersGrid) {

    const GridContent = useMemo(() => {
        return players.map((item, index) => (
            <Grid__item key={item.nick_name}>
                <Player nick_name={item.nick_name} experience={item.experience}/>
                <h5>
                    {item.nick_name}
                </h5>
            </Grid__item>
        )) || null;
    }, [players]);

    return (
        <Grid>
            {GridContent}
        </Grid>
    )
}

export default PlayersGrid;
