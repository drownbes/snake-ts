import { GameObject } from './GameObject';
import { Direction, DirectionEnum, Directions} from './Direction';
import {Settings} from "./Settings";

export class Snake {
  public body: Array<GameObject> = [];
  public direction: Direction;
  public isActive = false;
  public grow = false;

  constructor(private settings: Settings) {
  }

  public initSnake(size: number, x: number, y: number, dir: Direction) {
    this.body = [];
    let cell = new GameObject(x, y);
    this.body.push(cell);
    this.direction = dir;
    for (let i = 1; i < size; i++) {
      cell = Directions.get(this.direction.oppositeName)
        .transfromFn(new GameObject(cell.x, cell.y));
      this.body.push(cell);
    }
  }

  public step() {
    console.log('snake step');
    if (this.grow) {
      this.grow = false;
    } else {
      this.body.pop();
    }
    this.body.unshift(
      this.direction.transfromFn(new GameObject(this.head.x, this.head.y))
    );
  }

  public changeDirection(dir: Direction) {
    if (!this.direction.isOpposite(dir)) {
      this.direction = dir;
    }

    this.step();
  }

  public turnLeft() {
    this.changeDirection(Directions.get(DirectionEnum.Left));
  }

  public turnRight() {
    this.changeDirection(Directions.get(DirectionEnum.Right));
  }

  public get head() {
    return this.body[0];
  }

  public get tail() {
    return this.body.slice(1, this.body.length);
  }

  public get end() {
    return this.body[this.body.length - 1];
  }

  public feed() {
    this.grow = true;
  }

  public haveSelfCollisions() {
    if (this.body.length < 5) { return false; }
    return (this.head.x === this.end.x &&
      this.head.y === this.end.y);
  }

  public haveWallsCollisions() {
    return (this.head.x < 0 || this.head.x >= this.settings.width) ||
      (this.head.y < 0 || this.head.y >= this.settings.height);
  }

  public hasCollisionWith({ x, y }: {x: number, y: number}) {
    return (this.head.x === x &&
      this.head.y === y);
  }
}