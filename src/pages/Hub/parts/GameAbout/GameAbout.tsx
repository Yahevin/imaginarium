import React from 'react';
import { IGameAbout } from '@my-app/interfaces';

export const GameAbout = (props: IGameAbout) => {
  return (
    <div>
      <div>Создана: {props.created_at}</div>
      <div>Пати: {props.game_name}</div>
      <div>Игроки:</div>
      {props.players.map((item) => {
        return <div key={item.id}>{item.nick_name}</div>;
      })}
    </div>
  );
};
