import { degreeToRad } from '../shared/degree-to-rad';
import { LEVEL_LENGTH } from '../shared/level';
import { CFColor } from '../shared/palette';
import { PositionableElement } from './positionable-element';

export enum CellWallType {
  START,
  END,
}

export class Cilium extends PositionableElement {
  public static AMP_MAX = 10;
  private _waveAngle = Math.floor(360 * Math.random());
  private _drift = 0;
  private _speed = Math.floor(Math.random() * 2) + 1; // 1, 2

  constructor(
    yPos: number,
    color: CFColor,
    length: number,
    private _wallType: CellWallType,
    private _amplitude: number
  ) {
    super(
      _wallType === CellWallType.START ? 0 : LEVEL_LENGTH,
      yPos,
      color,
      Cilium._randomLength(length)
    );
  }

  override update(p?: any) {
    this._waveAngle += this._speed;
    if (this._waveAngle >= 360) this._waveAngle = 0;
    let waveSin = Math.sin(degreeToRad(this._waveAngle));
    this._amplitude = Cilium.AMP_MAX * waveSin;
    this._drift = (Cilium.AMP_MAX * waveSin) / 2;
    super.update();
  }

  override restore(data: PositionableElement): void {
    this._xPos = data.xPos;
  }

  private static _randomLength(l) {
    const minLength = Math.ceil(l * 0.3); // Minimum length
    const maxLength = Math.floor(l * 1); // Maximum length
    const randomLength =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
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
}
