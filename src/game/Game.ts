import { Settings } from './Settings';
import { Direction, Directions, DirectionEnum } from './Direction';
import { Snake } from './Snake';
import { Food } from './Food';

export enum GameStateEnum {
  Stop = 'Stop',
  Run = 'Run',
  Fail = 'Fail',
  Win = 'Win'
}

export class Game {
  public snake: Snake;
  public settings: Settings;
  public food: Food;

  public gameState: GameStateEnum = GameStateEnum.Stop;
  private lastFrameTimeMs: number;
  private tickLengthMs: number;
  private delta: number;
  private direction: Direction | null = null;
  private speedCounter: number = 0;
  private updateCbl: () => void;
  private frameId: number;

  constructor(updateCbl: () => void) {
    this.settings = new Settings();
    this.snake = new Snake(this.settings);
    this.food = new Food(this.settings);
    this.snake.isActive = true;
    this.food.isActive = true;
    this.updateCbl = updateCbl;
  }

  grapInput() {
    document.addEventListener("keydown", this.onKeyPress.bind(this));
  }

  releaseInput() {
    document.removeEventListener("keydown", this.onKeyPress.bind(this));
  }

  onKeyPress(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 37:
        this.direction = Directions.get(DirectionEnum.Left);
        break;
      case 39:
        this.direction = Directions.get(DirectionEnum.Right);
        break;
      case 38:
        this.direction = Directions.get(DirectionEnum.Up);
        break;
      case 40:
        this.direction = Directions.get(DirectionEnum.Down);
        break;
      default:
        break;
    }
  }

  start() {
    this.gameState = GameStateEnum.Run;
    this.snake.initSnake(5, 5, 5, Directions.get(DirectionEnum.Down));
    this.food.step();
    this.updateCbl();
    this.direction = null;
    this.grapInput();
    this.startLoop();
  }

  startLoop() {
    this.speedCounter = 0;
    this.tickLengthMs = Math.floor(1000 / this.settings.fps);
    this.lastFrameTimeMs = 0;
    this.delta = 0;
    this.frameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  fail() {
    this.gameState = GameStateEnum.Fail;
    cancelAnimationFrame(this.frameId);
    this.releaseInput();
    this.updateCbl();
  }

  isRunning() {
    return this.gameState === GameStateEnum.Run;
  }

  gameLoop(timestamp: number) {
    if ( !this.isRunning() ) {
      return;
    }
    if (timestamp < this.lastFrameTimeMs + this.tickLengthMs) {
      this.frameId = requestAnimationFrame(this.gameLoop.bind(this));
      return;
    }
    this.delta += timestamp - this.lastFrameTimeMs;
    this.lastFrameTimeMs = timestamp;

    while (this.delta >= this.tickLengthMs) {
      this.update(this.tickLengthMs);
      this.delta -= this.tickLengthMs;
    }
    this.render(timestamp);
    this.frameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  update(timestamp: number) {
    if ( !this.isRunning() ) {
      return;
    }
    this.speedCounter += timestamp;
    if (this.speedCounter >= this.settings.speedMs) {
      if (this.direction) {
        this.snake.changeDirection(this.direction);
      } else {
        this.snake.step();
      }

      if (this.snake.haveWallsCollisions() || this.snake.haveSelfCollisions()) {
        this.fail();
        return;
      }

      if (this.snake.hasCollisionWith(this.food)) {
        this.snake.feed();
        this.food.step();
      }
      this.speedCounter = 0;
    }
  }

  render(timestamp: number) {
    if ( !this.isRunning() ) {
      return;
    }
    this.updateCbl();
  }
}