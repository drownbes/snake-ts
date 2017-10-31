import { GameObject } from './GameObject';

type ITransformFn = (gameObject: GameObject) => GameObject;

export enum DirectionEnum {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

export class Direction {
  constructor(
    private name: DirectionEnum,
    public oppositeName: DirectionEnum,
    public transfromFn: ITransformFn
  ) {}

  public isOpposite(dir: Direction) {
    return (dir.name === this.oppositeName);
  }
}

const inc = (x: number) => x + 1;
const dec = (x: number) => x - 1;

export class Directions {
  static _dirs = {
    [DirectionEnum.Up]: new Direction(
      DirectionEnum.Up, DirectionEnum.Down,
      (gameObject: GameObject) => gameObject.mapProp('y', dec )
    ),
    [DirectionEnum.Down]: new Direction(
      DirectionEnum.Down, DirectionEnum.Up,
      (gameObject: GameObject) => gameObject.mapProp('y', inc)
    ),
    [DirectionEnum.Left]: new Direction(
      DirectionEnum.Left, DirectionEnum.Right,
      (gameObject: GameObject) => gameObject.mapProp('x', dec)
    ),
    [DirectionEnum.Right]: new Direction(
      DirectionEnum.Right, DirectionEnum.Left,
      (gameObject: GameObject) => gameObject.mapProp('x', inc)
    )
  };

  public static get(dir: DirectionEnum) {
    return Directions._dirs[dir];
  }

}