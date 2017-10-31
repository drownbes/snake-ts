import { Settings } from './Settings';



export class Food {
  public isActive: boolean = false;
  public x: number = 0;
  public y: number = 0;

  constructor(private settings: Settings) {
  }

  step() {
    this.x = Math.floor(Math.random() * (this.settings.width - 1));
    this.y = Math.floor(Math.random() * (this.settings.height - 1));
  }

}