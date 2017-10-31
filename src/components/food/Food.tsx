import * as React from 'react';
import './Food.css';
import { GameObject } from '../gameObject/GameObject';
import { Settings } from '../../game/Settings';
import { Food as FoodObj } from '../../game/Food';

interface FoodProps {
  food: FoodObj;
  settings: Settings;
}

export function Food({food, settings}: FoodProps) {
  return (
    <GameObject
      x={food.x}
      y={food.y}
      cellSize={settings.cellSize}
    >
      <div className={'food'} style={{borderRadius: settings.cellSize}}/>
    </GameObject>
  );
}