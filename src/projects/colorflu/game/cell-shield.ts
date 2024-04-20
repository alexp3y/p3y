import { degreeToRad } from '../shared/degree-to-rad';
import { CFColor, palette } from '../shared/palette';
import { radialDistance } from '../shared/radial-distance';
import { randomColor } from '../shared/random';
import { ControlType } from './control-type.enum';
import { Controllable } from './controllable.interface';
import { MovableElement } from './movable-element';
import { PositionableElement } from './positionable-element';
import { Restorable } from './restorable.interface';
import { WhiteBloodCell } from './white-blood-cell';

export class CellShield
  extends MovableElement
  implements Controllable, Restorable<CellShield>
{
  static RADIUS_INCREMENT = 5;
  static POWER_STEP = 5;
  static MAX_LEVEL = 50;

  private _startAngle: number = 0;
  private _endAngle: number = 0;
  private _shieldDirection: ControlType | null = null;
  private _power = 0;
  private _activeLevel = 0;
  private _maxLevel = CellShield.MAX_LEVEL;
  private _levelColors: CFColor[] = [];
  initialRadius = 0;

  constructor(cell: WhiteBloodCell) {
    let radius = WhiteBloodCell.RADIUS * 1.5;
    super(cell.xPos, cell.yPos, palette.red, radius);
    this.initialRadius = radius;
    let x = 0;
    while (x < CellShield.MAX_LEVEL) {
      x++;
      this._levelColors.push(randomColor());
    }
  }

  applyControl(control: ControlType) {
    if (ControlType[control].startsWith('SHIELD')) {
      if (this._shieldDirection !== control) {
        this._power = 0;
        this._activeLevel = 0;
        this._shieldDirection = control;
        this._updateShield();
      }
    }
  }

  releaseControl(control: ControlType) {
    if (this._shieldDirection === control) {
      this._shieldDirection = null;
      this._power = 0;
      this._activeLevel = 0;
    }
  }

  update(cell: WhiteBloodCell) {
    if (this._shieldDirection) {
      if (this._activeLevel < this._maxLevel) {
        this._power++;
        this._activeLevel = Math.floor(this._power / CellShield.POWER_STEP);
      }
    }
    this._xVelocity = cell.xVelocity;
    this._yVelocity = cell.yVelocity;
    this._xScrollVelocity = cell.xScrollVelocity;
    super.update();
  }

  restore(data: CellShield): void {
    this._xPos = data._xPos;
    this._yPos = data._yPos;
  }

  override isCollidedWith(element: PositionableElement): boolean {
    if (!!this._shieldDirection) {
      let collided =
        this._isAtShieldAngle(element) && this._isWithinShieldRange(element);
      if (collided && this._activeLevel > 0) {
        this._activeLevel--;
        this._maxLevel--;
        this._power += -CellShield.POWER_STEP;
      }
      return collided;
    }
    return false;
  }

  private _isAtShieldAngle(element: PositionableElement) {
    const dx = element.xPos - this._xPos;
    const dy = element.yPos - this._yPos;
    let angle = Math.atan2(dy, dx);
    if (dy < 0) angle += 2 * Math.PI;
    return this._shieldDirection === ControlType.SHIELD_RIGHT
      ? angle < this._startAngle || angle > this._endAngle
      : angle < this._startAngle && angle > this._endAngle;
  }

  private _isWithinShieldRange(element: PositionableElement) {
    return (
      radialDistance(this, element) <=
      element.radius +
        (this.radius + CellShield.RADIUS_INCREMENT * this._activeLevel)
    );
  }

  private _updateShield() {
    switch (this._shieldDirection) {
      case ControlType.SHIELD_RIGHT:
        this._engageShieldRight();
        break;
      case ControlType.SHIELD_BOTTOM:
        this._engageShieldBottom();
        break;
      case ControlType.SHIELD_LEFT:
        this._engageShieldLeft();
        break;
      case ControlType.SHIELD_TOP:
        this._engageShieldTop();
        break;
      default:
        break;
    }
  }

  private _engageShieldRight() {
    this._startAngle = degreeToRad(45);
    this._endAngle = degreeToRad(315);
  }

  private _engageShieldBottom() {
    this._startAngle = degreeToRad(135);
    this._endAngle = degreeToRad(45);
  }

  private _engageShieldLeft() {
    this._startAngle = degreeToRad(225);
    this._endAngle = degreeToRad(135);
  }

  private _engageShieldTop() {
    this._startAngle = degreeToRad(315);
    this._endAngle = degreeToRad(225);
  }

  public get startAngle(): number {
    return this._startAngle;
  }

  public get endAngle(): number {
    return this._endAngle;
  }

  public get shieldEngaged(): boolean {
    return !!this._shieldDirection;
  }

  public get power(): number {
    return this._power;
  }

  public get activeLevel(): number {
    return this._activeLevel;
  }

  public get maxLevel(): number {
    return this._maxLevel;
  }

  public get levelColors(): CFColor[] {
    return this._levelColors;
  }
}
