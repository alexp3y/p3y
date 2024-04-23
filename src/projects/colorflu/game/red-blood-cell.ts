import { LEVEL_LENGTH } from '../shared/level';
import { palette } from '../shared/palette';
import {
  posNeg,
  randomBetween,
  randomColor,
  randomPosition,
} from '../shared/random';
import { WindowDimensions } from '../shared/window-dimensions';
import { MovableElement } from './movable-element';

export class RedBloodCell extends MovableElement {
  private static RADIUS_MIN = 4;
  private static RADIUS_MAX = 150;
  private static ALPHA = 0.05;
  private _maxWidth: number;

  constructor(dimensions: WindowDimensions, spawnWidth: number = LEVEL_LENGTH) {
    let radius = randomBetween(
      RedBloodCell.RADIUS_MIN,
      RedBloodCell.RADIUS_MAX
    );
    super(
      randomPosition(spawnWidth),
      randomPosition(dimensions.height),
      randomColor(),
      radius,
      RedBloodCell.ALPHA,
      randomBetween(-0.3, 0.3), // randomVelocity(),
      randomBetween(-0.3, 0.3) // randomVelocity()
    );
    this._maxWidth = spawnWidth;
  }

  override update(dims: WindowDimensions): void {
    this._enforceScreenLimit(dims);
    super.update();
  }

  private _enforceScreenLimit(dims: WindowDimensions) {
    if (this._xPos < 0 - 50 || this._xPos > this._maxWidth + 50) {
      this._xVelocity = -this._xVelocity;
    }
    if (this._yPos < 0 - 50 || this._yPos > dims.height + 50) {
      this._yVelocity = -this._yVelocity;
    }
  }
}
