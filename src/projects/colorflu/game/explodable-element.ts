import { CFColor, palette } from '../shared/palette';
import { randomBetween, randomColor } from '../shared/random';
import { Explodable } from './interface/explodable.interface';
import { MovableElement } from './movable-element';

export class ExplodableElement extends MovableElement implements Explodable {
  private _exploded = false;
  private _explodedFragments: MovableElement[] = [];
  private _timeRemaining = 150;
  private _cellExplosion = false;
  private _fragmentCount = 12;

  override update(p1?: any, p2?: any): void {
    if (this._exploded) {
      if (this._timeRemaining > 0) {
        this._explodedFragments.forEach((e) => {
          e.xScrollVelocity = this._xScrollVelocity;
          e.update();
        });
        super.update();
        this._timeRemaining--;
        if (this._timeRemaining <= 0) {
          this._explodedFragments = [];
          this.destroy();
        }
      }
    } else {
      super.update();
    }
  }

  explode(cellExplosion?: boolean): void {
    this._exploded = true;
    this._cellExplosion = !!cellExplosion;
    this._timeRemaining = this._timeRemaining + (cellExplosion ? 50 : 0);
    for (let i = 0; i < this._fragmentCount + (cellExplosion ? 12 : 0); i++) {
      this._explodedFragments.push(
        new MovableElement(
          this._xPos,
          this.yPos,
          cellExplosion ? palette.pink : randomColor(),
          this.radius,
          0.9,
          randomBetween(-0.35, 0.35) +
            this._xVelocity * (cellExplosion ? 0.01 : 0.45),
          randomBetween(-0.35, 0.35) +
            this._yVelocity * (cellExplosion ? 0.01 : 0.45)
        )
      );
    }
    this._xVelocity =
      randomBetween(-0.35, 0.35) +
      this._xVelocity * (cellExplosion ? 0.01 : 0.45);
    this._yVelocity =
      randomBetween(-0.35, 0.35) +
      this._yVelocity * (cellExplosion ? 0.01 : 0.45);
  }

  isExploded(): boolean {
    return this._exploded;
  }

  public get explodedFragments(): MovableElement[] {
    return this._explodedFragments;
  }

  public get timeRemaining(): number {
    return this._timeRemaining;
  }

  public get fragmentCount(): number {
    return this._fragmentCount;
  }

  public get isCellExplosion(): boolean {
    return this._cellExplosion;
  }
}
