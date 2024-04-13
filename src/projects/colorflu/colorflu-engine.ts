import { ColorfluGame } from './colorflu-game';
import { ColorfluGraphics } from './colorflu-graphics';
import { ControlType } from './game/control-type';
import { WindowDimensions } from './shared/window-dimensions';

export class ColorfluEngine {
  private _game: ColorfluGame;
  private _graphics: ColorfluGraphics;

  constructor(
    private _canvas: HTMLCanvasElement,
    private _dimensions: WindowDimensions
  ) {
    this._game = new ColorfluGame(this._dimensions);
    this._graphics = new ColorfluGraphics(this._canvas, this._dimensions);
  }

  public start() {
    setInterval(() => {
      this._game.update();
    }, 19);
  }

  public get game(): ColorfluGame {
    return this._game;
  }

  public get graphics(): ColorfluGraphics {
    return this._graphics;
  }

  public get screenWidth(): number {
    return this._dimensions.width;
  }

  public render() {
    this._graphics.renderGame(this._game);
  }

  public handleResize(dim: WindowDimensions) {
    this._dimensions = dim;
    this._game.resizeWindow(this._dimensions);
    this._graphics.resizeWindow(this._dimensions);
  }

  public handleKeydown(key: string) {
    switch (key) {
      case 'ArrowUp':
        this._game.applyControl(ControlType.GO_UP);
        break;
      case 'ArrowLeft':
        this._game.applyControl(ControlType.GO_LEFT);
        break;
      case 'ArrowDown':
        this._game.applyControl(ControlType.GO_DOWN);
        break;
      case 'ArrowRight':
        this._game.applyControl(ControlType.GO_RIGHT);
        break;
    }
  }

  public handleKeyup(key: string) {
    switch (key) {
      case 'ArrowUp':
        this._game.releaseControl(ControlType.GO_UP);
        break;
      case 'ArrowLeft':
        this._game.releaseControl(ControlType.GO_LEFT);
        break;
      case 'ArrowDown':
        this._game.releaseControl(ControlType.GO_DOWN);
        break;
      case 'ArrowRight':
        this._game.releaseControl(ControlType.GO_RIGHT);
        break;
    }
  }
}
