import * as React from 'react';
import './GameObject.css';

export interface GameObjectBaseProps {
  x: number;
  y: number;
  cellSize: number;
}

export interface GameObjectProps extends GameObjectBaseProps {
  children?: React.ReactNode;
}

export function GameObject({x, y, cellSize, children}: GameObjectProps) {
  return (
    <div className={'gameObject'} style={{top: y * cellSize, left: x * cellSize, width: cellSize, height: cellSize}}>
      {children}
    </div>
  );
}