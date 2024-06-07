import { degreeToRad } from '../shared/degree-to-rad';
import { CFColor, palette } from '../shared/palette';
import { radialDistance } from '../shared/radial-distance';
import { ControlType } from './control-type.enum';
import { Controllable } from './interface/controllable.interface';
import { MovableElement } from './movable-element';
import { PositionableElement } from './positionable-element';
import { Restorable } from './interface/restorable.interface';
import { WhiteBloodCell } from './white-blood-cell';

export const SHIELD_COLORS: CFColor[] = [
  palette.pink,
  palette.darkBlue,
  palette.orange,
  palette.blue,
  palette.yellow,
  palette.green,
  palette.maroon,
];

export class CellShield
  extends MovableElement
  implements Controllable, Restorable<CellShield>
{
  private _shieldRequested = false;
  private _shieldEngaged = false;
  private _shieldPower = 100;

  private _color1Index = 0;
  private _color2Index = 1;
  private _color3Index = 2;

  private _hitFlashTime = 0;

  constructor(cell: WhiteBloodCell) {
    let radius = Math.floor(WhiteBloodCell.RADIUS * 1.5);
    super(cell.xPos, cell.yPos, palette.orange, radius);
  }

  applyControl(control: ControlType) {
    if (control === ControlType.SHIELD) {
      this._shieldRequested = true;
    }
  }

  releaseControl(control: ControlType) {
    if (control === ControlType.SHIELD) {
      this._shieldRequested = false;
    }
  }

  update(clock: number, cell: WhiteBloodCell) {
    if (this._shieldRequested) {
      if (this._shieldPower > 0) {
        this._shieldEngaged = true;
        if (clock % 8 == 0) {
          this._updateColors();
        }
        this._shieldPower--;
      } else if (this._shieldPower <= 0) {
        this._shieldEngaged = false;
        this._shieldPower = -50;
      }
    } else {
      this._shieldEngaged = false;
      if (this._shieldPower < 100) {
        this._shieldPower++;
        if (this._shieldPower === 1) this._hitFlashTime = 5;
      }
    }
    if (this._hitFlashTime > 0) {
      this._hitFlashTime--;
    }
    this._xVelocity = cell.xVelocity;
    this._yVelocity = cell.yVelocity;
    this._xScrollVelocity = cell.xScrollVelocity;
    super.update();
  }

  private _updateColors() {
    this._color1Index++;
    this._color2Index++;
    this._color3Index++;
    if (this._color1Index == SHIELD_COLORS.length) this._color1Index = 0;
    if (this._color2Index == SHIELD_COLORS.length) this._color2Index = 0;
    if (this._color3Index == SHIELD_COLORS.length) this._color3Index = 0;
  }

  restore(data: CellShield): void {
    this._xPos = data._xPos;
    this._yPos = data._yPos;
  }

  override isCollidedWith(element: PositionableElement): boolean {
    let collided = this.engaged && super.isCollidedWith(element);
    if (collided && this._hitFlashTime < 10) {
      this._hitFlashTime = 10;
    }
    return collided;
  }

  public get engaged(): boolean {
    return this._shieldEngaged;
  }

  public get power(): number {
    return this._shieldPower;
  }

  public get color1Index(): number {
    return this._color1Index;
  }

  public get color2Index(): number {
    return this._color2Index;
  }

  public get color3Index(): number {
    return this._color3Index;
  }

  public isHit(): boolean {
    return this._hitFlashTime > 0;
  }

  public get requested(): boolean {
    return this._shieldRequested;
  }
}
