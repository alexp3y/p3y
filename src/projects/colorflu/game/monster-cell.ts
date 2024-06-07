import { degreeToRad } from '../shared/degree-to-rad';
import { palette } from '../shared/palette';
import { MovableElement } from './movable-element';

export class MonsterCell extends MovableElement {
  private _waveAngle = Math.ceil(360 * Math.random());
  private _amplitude = 0;
  private _drift = 0;

  constructor(x: number, y: number) {
    super(x, y, palette.blue, 150, 1, -0.5, 0);
  }

  update() {
    this._waveAngle++;
    if (this._waveAngle > 360) this._waveAngle = 0;
    let waveSin = Math.sin(degreeToRad(this._waveAngle));
    this._amplitude = 10 * waveSin;
    this._drift = 10 * waveSin;
    super.update();
  }

  public get waveAngle(): number {
    return this._waveAngle;
  }
}
