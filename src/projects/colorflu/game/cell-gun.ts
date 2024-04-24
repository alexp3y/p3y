import { randomColor } from '../shared/random';
import { ExplodableElement } from './explodable-element';
import { MovableElement } from './movable-element';

export class CellGun {
  private static BULLET_RADIUS = 4;
  private static BULLET_VELOCITY = 7;

  private _bullets: MovableElement[] = [];

  shootRight(xPos, yPos) {
    this._bullets.push(
      new MovableElement(
        xPos,
        yPos,
        randomColor(),
        CellGun.BULLET_RADIUS,
        1,
        CellGun.BULLET_VELOCITY
      )
    );
  }

  shootLeft(xPos, yPos) {
    this._bullets.push(
      new MovableElement(
        xPos,
        yPos,
        randomColor(),
        CellGun.BULLET_RADIUS,
        1,
        -CellGun.BULLET_VELOCITY
      )
    );
  }

  isShot(el: ExplodableElement): boolean {
    for (let x = 0; x < this._bullets.length; x++) {
      let bullet = this._bullets[x];
      if (!bullet.isDestroyed() && bullet.isCollidedWith(el)) {
        el.explosionColor = bullet.color;
        bullet.destroy();
        return true;
      }
    }
    return false;
  }

  public get bullets(): MovableElement[] {
    return this._bullets;
  }
}
