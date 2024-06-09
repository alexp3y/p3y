import { degreeToRad } from '../shared/degree-to-rad';
import { CFColor, colorBlack, palette } from '../shared/palette';
import { posNeg, randomBetween } from '../shared/random';
import { PositionableElement } from './positionable-element';
import { WhiteBloodCell } from './white-blood-cell';

export enum CiliumSize {
  SMALL,
  MEDIUM,
  BIG,
}

export enum CiliumLocation {
  TOP,
  BOTOTM,
}

export class BottomCilium extends PositionableElement {
  public static AMP_MIN = 7;
  public static AMP_MAX = 10;
  private _waveAngle = Math.ceil(360 * Math.random());
  private _drift = Math.ceil(Math.random() * 10);
  private _speed = Math.ceil(Math.random() * 2); // 1, 2
  private _amplitudeTop = Math.ceil(randomBetween(5, 10));
  private _amplitude: number = Math.ceil(
    randomBetween(-this._amplitudeTop, this._amplitudeTop)
  );
  private _velocityImpactTimer = 0;
  private _velocityImpactX = 0;
  private _size: CiliumSize;
  private _location: CiliumLocation;

  constructor(xPos: number, yPos: number, color: CFColor, length: number) {
    super(
      xPos,
      yPos > 0 ? yPos : 0,
      colorBlack,
      BottomCilium._randomLength(length)
    );
    this._location = yPos > 0 ? CiliumLocation.BOTOTM : CiliumLocation.TOP;
    this._size = CiliumSize.SMALL;
    this._color = randomBetween(0, 4) > 3 ? palette.green : palette.orange;
    if (this._radius > (2 * length) / 5) {
      this._size = CiliumSize.MEDIUM;
      this._color = posNeg() > 0 ? palette.orange : palette.maroon;
      if (this._radius > (2 * length) / 3) {
        this._size = CiliumSize.BIG;
        this._color = palette.green;
      }
    }
  }

  override update(cell: WhiteBloodCell) {
    let velImpact = 0;
    if (
      cell.isCollidedWith(this) &&
      Math.abs(cell.xPos - this._xPos) < cell.radius &&
      this._velocityImpactX !== cell.xPos
    ) {
      this._velocityImpactTimer = 120;
      this._velocityImpactX = cell.xPos;
    }
    if (this._velocityImpactTimer > 0) {
      velImpact = 3;
      if (this._velocityImpactTimer > 60) {
        velImpact = 4;
        if (this._velocityImpactTimer > 90) {
          velImpact = 5;
          if (this._velocityImpactTimer > 100) {
            velImpact = 6;
          }
        }
      }
    }
    if (this._velocityImpactTimer > 0) this._velocityImpactTimer--;
    this._waveAngle +=
      this._speed + (this._velocityImpactTimer > 0 ? velImpact : 0);
    if (this._waveAngle >= 360) this._waveAngle = 0;
    let waveSin = Math.sin(degreeToRad(this._waveAngle));
    this._amplitude =
      (this._amplitudeTop + (this._velocityImpactTimer > 0 ? 1 : 0)) * waveSin;
    this._drift =
      (this._amplitudeTop + (this._velocityImpactTimer > 0 ? 1.5 : 0)) *
      waveSin;
    super.update();
  }

  override restore(data: PositionableElement): void {
    this._xPos = data.xPos;
  }

  private static _randomLength(l) {
    const minLength = Math.ceil(l * 0.3); // Minimum length
    const maxLength = Math.ceil(l * 1); // Maximum length
    let randomLength =
      Math.ceil(Math.random() * (maxLength - minLength + 1)) + minLength;
    if (randomLength > (3 * l) / 4) {
      randomLength =
        randomBetween(0, 10) > 9 ? Math.ceil(randomLength * 1.1) : randomLength;
    }
    return randomLength;
  }

  public get length(): number {
    return this._radius;
  }

  public get amplitude(): number {
    return this._amplitude;
  }

  public get drift(): number {
    return this._drift;
  }

  public get size(): CiliumSize {
    return this._size;
  }

  public get location(): CiliumLocation {
    return this._location;
  }
}
