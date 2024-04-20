import { palette } from '../shared/palette';
import { randomColor } from '../shared/random';
import { MovableElement } from './movable-element';
import { PositionableElement } from './positionable-element';

export class CellGun {
  private static BULLET_RADIUS = 3;
  private static BULLET_VELOCITY = 7;

  private _bullets: MovableElement[] = [];

  fire(xPos, yPos) {
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

  isShot(el: PositionableElement): boolean {
    for (let x = 0; x < this._bullets.length; x++) {
      let bullet = this._bullets[x];
      if (!bullet.isDestroyed() && bullet.isCollidedWith(el)) {
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
