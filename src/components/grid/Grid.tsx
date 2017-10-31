import * as React from 'react';
import './Grid.css';
import { Game } from '../../game/Game';
import { Snake } from '../snake';
import { Food } from "../food/Food";

export interface GridProps {
  game: Game;
}

export function Grid({game}: GridProps) {
  const { width, height, cellSize } = game.settings;
  return (
    <div className={'grid'} style={{width: width * cellSize, height: height * cellSize}}>
      {game.snake.isActive && <Snake snake={game.snake} settings={game.settings}/>}
      {game.food.isActive && <Food food={game.food} settings={game.settings}/>}
    </div>
  );
}