import { ColorfluGame } from './game';
import { ControlType } from './game/control-type.enum';
import { ColorfluGraphics } from './graphics';
import { WindowDimensions } from './shared/window-dimensions';

export class ColorfluEngine {
  private _game: ColorfluGame | null = null;
  private _graphics: ColorfluGraphics;
  private _gameLoopInterval: NodeJS.Timeout | null = null;
  private _running: boolean = false;
  private _paused: boolean = false;
  private _id: number = Math.floor(Math.random() * 100000);

  constructor(
    private _canvas: HTMLCanvasElement,
    private _dimensions: WindowDimensions
  ) {
    this._graphics = new ColorfluGraphics(this._canvas, this._dimensions);
  }

  start(savedGame?: ColorfluGame) {
    if (!this._running) {
      console.log('starting engine');
      this._game = new ColorfluGame(this._dimensions);
      if (savedGame) {
        this._game.restore(savedGame);
      }
      this._startGameLoop();
      this._running = true;
    }
  }

  eject(): string {
    return JSON.stringify(this._game);
  }

  pause() {
    this._paused = true;
    this._haltGameLoop();
    // console.log(JSON.stringify(this._game));
    // localStorage.setItem('COLORFLU_DATA', this.eject());
  }

  resume() {
    this._paused = false;
    this._startGameLoop();
  }

  public render() {
    if (this._game && !this._paused) {
      this._graphics.renderGame(this._game!);
    }
  }

  public handleResize(dim: WindowDimensions) {
    this._dimensions = dim;
    if (this._game) {
      this._game.resizeWindow(this._dimensions);
      this._graphics.resizeWindow(this._dimensions);
    }
  }

  private _startGameLoop = () => {
    if (!this._gameLoopInterval) {
      this._gameLoopInterval = setInterval(() => {
        if (!this._game?.isScreenAttached) {
          this._haltGameLoop();
        }
        this._game!.update();
      }, 19);
    }
  };

  private _haltGameLoop = () => {
    if (this._gameLoopInterval) {
      clearInterval(this._gameLoopInterval);
      this._gameLoopInterval = null;
    }
  };

  public handleKeydown(key: string) {
    if (this._paused) return;
    switch (key.toLowerCase()) {
      case ' ':
        this.pause();
        break;
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
      case 'w':
        this._game!.applyControl(ControlType.SHIELD_TOP);
        break;
      case 'a':
        this._game!.applyControl(ControlType.SHIELD_LEFT);
        break;
      case 's':
        this._game!.applyControl(ControlType.SHIELD_BOTTOM);
        break;
      case 'd':
        this._game!.applyControl(ControlType.SHIELD_RIGHT);
        break;
      case 'f':
        this._game!.applyControl(ControlType.SHOOT);
        break;
    }
  }

  public handleKeyup(key: string) {
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
      case 'w':
        this._game!.releaseControl(ControlType.SHIELD_TOP);
        break;
      case 'a':
        this._game!.releaseControl(ControlType.SHIELD_LEFT);
        break;
      case 's':
        this._game!.releaseControl(ControlType.SHIELD_BOTTOM);
        break;
      case 'd':
        this._game!.releaseControl(ControlType.SHIELD_RIGHT);
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
}
