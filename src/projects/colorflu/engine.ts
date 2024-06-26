import { ColorfluGame } from './game';
import { ControlType } from './game/control-type.enum';
import { ColorfluGraphics } from './graphics';
import { WindowDimensions } from './shared/window-dimensions';
import { ColorfluSplashScreen } from './splash-screen';

export class ColorfluEngine {
  private _game: ColorfluGame | null = null;
  private _graphics: ColorfluGraphics;
  private _splashScreen: ColorfluSplashScreen;

  private _clock = 0;
  private _loopInterval: NodeJS.Timeout | null = null;

  private _running: boolean = false;
  private _paused: boolean = false;

  constructor(
    private _canvas: HTMLCanvasElement,
    private _dimensions: WindowDimensions
  ) {
    console.log('initializing game engine');
    this._graphics = new ColorfluGraphics(this._canvas, this._dimensions);
    this._splashScreen = new ColorfluSplashScreen(this._dimensions);
    this._startLoop();
  }

  start(savedGame?: ColorfluGame) {
    console.log('starting game');
    this._game = new ColorfluGame(this._dimensions);
    this._paused = false;
    this._startLoop();
    this._running = true;
  }

  endGame() {
    this.game?.endGame();
    this._paused = false;
  }

  eject(): string {
    return JSON.stringify(this._game);
  }

  pause() {
    this._paused = true;
    this._haltLoop();
  }

  resume() {
    this._paused = false;
    this._startLoop();
  }

  public render() {
    if (this._game) {
      if (!this._paused) {
        this._graphics.renderGame(this._game!);
      }
    } else {
      this._graphics.renderSplashScreen(this._splashScreen);
    }
  }

  public handleResize(dim: WindowDimensions) {
    this._dimensions = dim;
    if (this._game) {
      console.log('resizing window');
      this._game.resizeWindow(this._dimensions);
      this._graphics.resizeWindow(this._dimensions);
    }
  }

  private _startLoop = () => {
    if (!this._loopInterval) {
      this._loopInterval = setInterval(() => {
        this._clock++;
        if (this.game) {
          if (!this._game?.isScreenAttached) {
            // this._haltLoop();
          }
          this._game!.update(this._clock);
        } else {
          this._splashScreen.update(this._clock);
        }
      }, 17);
    }
  };

  private _haltLoop = () => {
    if (this._loopInterval) {
      clearInterval(this._loopInterval);
      this._loopInterval = null;
    }
  };

  public applyKey(key: string) {
    if (this._paused || this._game?.gameOver || this._game?.cell.isExploded()) {
      return;
    }
    switch (key.toLowerCase()) {
      case 'arrowup':
        this._game!.applyControl(ControlType.GO_UP);
        break;
      case 'arrowleft':
        this._game!.applyControl(ControlType.GO_LEFT);
        break;
      case 'arrowdown':
        this._game!.applyControl(ControlType.GO_DOWN);
        break;
      case 'arrowright':
        this._game!.applyControl(ControlType.GO_RIGHT);
        break;
      case 'a':
        this._game!.applyControl(ControlType.SHOOT_LEFT);
        break;
      case 's':
        this._game!.applyControl(ControlType.SHIELD);
        break;
      case 'd':
        this._game!.applyControl(ControlType.SHOOT_RIGHT);
        break;
      default:
        break;
    }
  }

  public stopCellMotion() {
    this._game!.releaseControl(ControlType.GO_UP);
    this._game!.releaseControl(ControlType.GO_LEFT);
    this._game!.releaseControl(ControlType.GO_RIGHT);
    this._game!.releaseControl(ControlType.GO_DOWN);
  }

  public releaseKey(key: string) {
    if (this._paused) return;
    switch (key.toLowerCase()) {
      case 'arrowup':
        this._game!.releaseControl(ControlType.GO_UP);
        break;
      case 'arrowleft':
        this._game!.releaseControl(ControlType.GO_LEFT);
        break;
      case 'arrowdown':
        this._game!.releaseControl(ControlType.GO_DOWN);
        break;
      case 'arrowright':
        this._game!.releaseControl(ControlType.GO_RIGHT);
        break;
      case 'a':
        this._game!.releaseControl(ControlType.SHOOT_LEFT);
        break;
      case 's':
        this._game!.releaseControl(ControlType.SHIELD);
        break;
      case 'd':
        this._game!.releaseControl(ControlType.SHOOT_RIGHT);
        break;
    }
  }

  public get game(): ColorfluGame | null {
    return this._game;
  }

  public get graphics(): ColorfluGraphics {
    return this._graphics;
  }

  public get screenWidth(): number {
    return this._dimensions.width;
  }

  public get paused(): boolean {
    return this._paused;
  }

  public get running(): boolean {
    return this._running;
  }

  public get clock(): number {
    return this._clock;
  }
}
