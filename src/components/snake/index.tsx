import * as React from 'react';
import { SnakeBody } from './body/SnakeBody';
import { SnakeHead } from './head/SnakeHead';
import { GameObject } from '../../game/GameObject';
import { Settings } from '../../game/Settings';
import { Snake as SnakeObj } from '../../game/Snake';

interface SnakeProp {
  snake: SnakeObj;
  settings: Settings;
}

export function Snake(props: SnakeProp) {
  const { head, tail } = props.snake;
  return (
    <div>
      <SnakeHead
        key={'head'}
        x={head.x}
        y={head.y}
        cellSize={props.settings.cellSize}
      />

      {tail.map((cell: GameObject) => (
      <SnakeBody
        key={cell.x + ' ' + cell.y}
        x={cell.x}
        y={cell.y}
        cellSize={props.settings.cellSize}
      />
    ))}
  </div>);
}