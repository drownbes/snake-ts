export class Settings {
  public width: number;
  public height: number;
  public fps: number;
  public cellSize: number;
  public speedMs: number;

  constructor() {
    this.width = 16;
    this.height = 16;
    this.fps = 30;
    this.cellSize = 10;
    this.speedMs = 300;
  }
}