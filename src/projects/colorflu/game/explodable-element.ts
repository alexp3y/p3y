import { colorBlack, palette } from '../shared/palette';
import { randomBetween, randomColor, randomVelocity } from '../shared/random';
import { Explodable } from './explodable.interface';
import { MovableElement } from './movable-element';

export class ExplodableElement extends MovableElement implements Explodable {
  public static FRAGMENT_SIZE = 9;
  public static FRAGMENT_COUNT = 20;
  private _exploded = false;
  private _explodedFragments: MovableElement[] = [];
  private _lifetime = 150;

  override update(p1?: any, p2?: any): void {
    if (this._exploded) {
      if (this._lifetime <= 0) {
        this._explodedFragments = [];
      } else {
        this._explodedFragments.forEach((e) => {
          e.xScrollVelocity = this._xScrollVelocity;
          e.update();
        });
        this._lifetime--;
      }
      return;
    }
    super.update();
  }

  explode(): void {
    this.destroy();
    this._exploded = true;
    for (let i = 0; i < ExplodableElement.FRAGMENT_COUNT; i++) {
      this._explodedFragments.push(
        new MovableElement(
          this._xPos,
          this.yPos,
          randomColor(),
          this.radius,
          0.9,
          randomBetween(-0.35, 0.35) + this._xVelocity * 0.45,
          randomBetween(-0.35, 0.35) + this._yVelocity * 0.45
        )
      );
    }
  }

  isExploded(): boolean {
    return this._exploded;
  }

  public get explodedFragments(): MovableElement[] {
    return this._explodedFragments;
  }
}
