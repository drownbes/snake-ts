import * as React from 'react';
import './SnakeBody.css';
import { GameObject } from '../../gameObject/GameObject';

export interface SnakeBodyProps {
  x: number;
  y: number;
  cellSize: number;
}

export function SnakeBody(props: SnakeBodyProps) {
  return (
    <GameObject {...props}>
      <div className={'snakeBody'}/>
    </GameObject>

  );
}