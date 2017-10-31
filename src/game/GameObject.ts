export class GameObject {

  constructor(public x: number, public y: number) {}

  public mapProp<T>(prop: string, mapFn: (arg: T) => T ): GameObject {
    if (this.hasOwnProperty(prop)) {
      this[prop] = mapFn(this[prop]);
    }
    return this;
  }

  public hasCollision(obj: GameObject) {
    return obj.x === this.x && obj.y === this.y;
  }
}