import { LEVEL_LENGTH } from '../shared/level';
import { NAVBAR_HEIGHT, WindowDimensions } from '../shared/window-dimensions';
import { ControlType } from './control-type';
import { MovableElement } from './movable-element';

export class ControllableElement extends MovableElement {
  private _maxVel = 2;
  private _minVel = -2;
  private _goRight: boolean = false;
  private _goLeft: boolean = false;
  private _goUp: boolean = false;
  private _goDown: boolean = false;
  private _progress = 0;

  constructor(xPos, yPos, color, radius, maxVel) {
    super(xPos, yPos, color, radius);
    if (maxVel) {
      this._maxVel = maxVel;
      this._minVel = -maxVel;
    }
  }

  override update(dims: WindowDimensions, xProgress: number) {
    this._updateVelocity();
    this._enforceScreenLimit(dims);
    this._moveOrScroll(dims);
    this._updateProgress(dims);
  }

  private _moveOrScroll(dims: WindowDimensions) {
    if (this._xPos > dims.width / 2) {
      if (
        this._xVelocity < 0 ||
        LEVEL_LENGTH - this._progress <= dims.width - this._xPos
      ) {
        // move
        this._xPos += this._xVelocity;
        this._xScrollVelocity = 0;
      } else {
        // scroll
        this._xScrollVelocity = this.xVelocity;
      }
    } else if (this._xPos < dims.width / 2) {
      if (this._xVelocity > 0 || this._progress <= 0) {
        this._xPos += this._xVelocity;
        this._xScrollVelocity = 0;
      } else {
        // scroll
        this._xScrollVelocity = this.xVelocity;
      }
    } else {
      this._xPos += this._xVelocity;
    }
    this._yPos += this._yVelocity;
  }

  private _updateProgress(dims: WindowDimensions) {
    if (LEVEL_LENGTH - this._progress < dims.width / 2) {
      this._progress += this._xVelocity;
    } else {
      this._progress += this._xScrollVelocity;
    }
    if (this._progress < 0) this._progress = 0;
    if (this._progress > LEVEL_LENGTH) this._progress = LEVEL_LENGTH;
  }

  private _enforceScreenLimit(dims: WindowDimensions) {
    // reposition if off-screen
    if (this._xPos > dims.width) {
      this._xPos = dims.width - this._radius;
    }
    if (this._yPos > dims.height) {
      this._yPos = dims.height - this._radius;
    }
    // screen boundary
    if (this._xPos <= 0 && this._goLeft) {
      this._xVelocity = 0;
    } else if (this._xPos - this._radius <= 0) {
      this._goLeft = false;
    }
    if (this._xPos >= dims.width && this._goRight) {
      this._xVelocity = 0;
    } else if (this._xPos + this._radius >= dims.width) {
      this._goRight = false;
    }
    if (this._yPos <= 0 && this._goUp) {
      this._yVelocity = 0;
    } else if (this._yPos - this._radius <= 0) {
      this._goUp = false;
    }
    if (this._yPos >= dims.height - NAVBAR_HEIGHT && this._goDown) {
      this._yVelocity = 0;
    } else if (this._yPos + this._radius >= dims.height - NAVBAR_HEIGHT) {
      this._goDown = false;
    }
  }

  private _updateVelocity() {
    if (!this._goRight && !this._goLeft) {
      // auto-decelerate X
      if (this._xVelocity > 0) this._xVelocity--;
      if (this._xVelocity < 0) this._xVelocity++;
    } else {
      if (this._goRight && this._xVelocity < this._maxVel) {
        this._xVelocity++;
      }
      if (this._goLeft && this._xVelocity > this._minVel) {
        this._xVelocity--;
      }
    }
    if (!this._goUp && !this._goDown) {
      // auto-decelerate Y
      if (this._yVelocity > 0) this._yVelocity--;
      if (this._yVelocity < 0) this._yVelocity++;
    } else {
      if (this._goDown && this._yVelocity < this._maxVel) {
        this._yVelocity++;
      }
      if (this._goUp && this._yVelocity > this._minVel) {
        this._yVelocity--;
      }
    }
  }

  applyControl(control: ControlType) {
    switch (control) {
      case ControlType.GO_LEFT:
        this.goLeft = true;
        break;
      case ControlType.GO_RIGHT:
        this.goRight = true;
        break;
      case ControlType.GO_UP:
        this.goUp = true;
        break;
      case ControlType.GO_DOWN:
        this.goDown = true;
        break;
    }
  }

  releaseControl(control: ControlType) {
    switch (control) {
      case ControlType.GO_LEFT:
        this.goLeft = false;
        break;
      case ControlType.GO_RIGHT:
        this.goRight = false;
        break;
      case ControlType.GO_UP:
        this.goUp = false;
        break;
      case ControlType.GO_DOWN:
        this.goDown = false;
        break;
    }
  }

  public get progress(): number {
    return this._progress;
  }

  public set goRight(v: boolean) {
    this._goRight = v;
  }

  public set goLeft(v: boolean) {
    this._goLeft = v;
  }

  public set goUp(v: boolean) {
    this._goUp = v;
  }

  public set goDown(v: boolean) {
    this._goDown = v;
  }
}
