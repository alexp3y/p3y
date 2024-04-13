import { LEVEL_LENGTH } from '../shared/level';
import { palette } from '../shared/palette';
import { randomBetween, randomPosition } from '../shared/random';
import { WindowDimensions } from '../shared/window-dimensions';
import { MovableElement } from './movable-element';

export class RedBloodCell extends MovableElement {
  private static RADIUS = 5;
  constructor(dimensions: WindowDimensions) {
    super(
      randomPosition(4000),
      randomPosition(dimensions.height),
      palette.pink,
      RedBloodCell.RADIUS,
      randomBetween(-0.3, 0.3), // randomVelocity(),
      randomBetween(-0.3, 0.3) // randomVelocity()
    );
    this._alpha = 0.25;
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
