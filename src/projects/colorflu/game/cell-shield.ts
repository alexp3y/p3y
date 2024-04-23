import { degreeToRad } from '../shared/degree-to-rad';
import { CFColor, colorWhite, palette } from '../shared/palette';
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
  private _startAngle: number = 0;
  private _endAngle: number = 0;
  private _shieldDirection: ControlType | null = null;

  private _colorCycleCounter = 0;
  private _color2: CFColor = colorWhite;
  private _color3: CFColor = colorWhite;

  constructor(cell: WhiteBloodCell) {
    let radius = WhiteBloodCell.RADIUS * 2;
    super(cell.xPos, cell.yPos, palette.orange, radius);
  }

  applyControl(control: ControlType) {
    if (ControlType[control].startsWith('SHIELD')) {
      if (this._shieldDirection !== control) {
        this._shieldDirection = control;
        this._updateShield();
      }
    }
  }

  releaseControl(control: ControlType) {
    if (this._shieldDirection === control) {
      this._shieldDirection = null;
    }
  }

  update(cell: WhiteBloodCell) {
    this._colorCycleCounter++;
    if (this._colorCycleCounter > 5) {
      this._color3 = this._color2;
      this._color2 = this._color;
      this._color = this._nextColor();
      this._colorCycleCounter = 0;
    }
    this._xVelocity = cell.xVelocity;
    this._yVelocity = cell.yVelocity;
    this._xScrollVelocity = cell.xScrollVelocity;
    super.update();
  }

  private _nextColor(): CFColor {
    return this._color.hex === palette.orange.hex
      ? palette.darkBlue
      : this._color.hex === palette.darkBlue.hex
      ? palette.pink
      : palette.orange;
  }

  restore(data: CellShield): void {
    this._xPos = data._xPos;
    this._yPos = data._yPos;
  }

  override isCollidedWith(element: PositionableElement): boolean {
    return (
      this.active &&
      this._isAtShieldAngle(element) &&
      this._isWithinShieldRange(element)
    );
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
    return radialDistance(this, element) <= element.radius + this.radius;
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

  public get active(): boolean {
    return !!this._shieldDirection;
  }

  public get color2(): CFColor {
    return this._color2;
  }

  public get color3(): CFColor {
    return this._color3;
  }
}
