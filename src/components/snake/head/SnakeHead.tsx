import * as React from 'react';
import './SnakeHead.css';
import { GameObject } from '../../gameObject/GameObject';

export interface SnakeHeadProps {
  x: number;
  y: number;
  cellSize: number;
}

export function SnakeHead(props: SnakeHeadProps) {
  return (
    <GameObject {...props}>
      <div className={'snakeHead'}/>
    </GameObject>
  );
}