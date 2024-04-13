import { LEVEL_LENGTH } from '../shared/level';
import { CFColor, palette } from '../shared/palette';
import {
  randomBetween,
  randomPosition,
  randomVelocity,
} from '../shared/random';
import { WindowDimensions } from '../shared/window-dimensions';
import { MovableElement } from './movable-element';

export class Virus extends MovableElement {
  private static RADIUS = 7;

  constructor(dimensions: WindowDimensions) {
    super(
      randomBetween(LEVEL_LENGTH / 2, LEVEL_LENGTH + dimensions.width / 2),
      randomPosition(dimensions.height),
      { hex: '#e22b2b' } as CFColor,
      Virus.RADIUS,
      randomBetween(-1, 1), // randomVelocity(),
      randomBetween(-1, 1) // randomVelocity()
    );
    this._alpha = 0.1;
  }

  override update(dims: WindowDimensions): void {
    this._enforceScreenLimit(dims);
    super.update();
  }

  private _enforceScreenLimit(dims: WindowDimensions) {
    if (this._xPos < 0 - 50 || this._xPos > LEVEL_LENGTH + 50) {
      this._xVelocity = -this._xVelocity;
    }
    if (this._yPos < 0 - 50 || this._yPos > dims.height + 50) {
      this._yVelocity = -this._yVelocity;
    }
  }
}
