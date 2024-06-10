import { randomColor } from '../shared/random';
import { ExplodableElement } from './explodable-element';
import { GameElement } from './game-element';
import { MovableElement } from './movable-element';

export class CellGun extends GameElement {
  private static BULLET_RADIUS = 4;
  private static BULLET_VELOCITY = 9;
  private static RECOIL_TIME = 10;

  private _bullets: MovableElement[] = [];
  private _recoilRight = 0;
  private _recoilLeft = 0;

  update(): void {
    if (this._recoilRight > 0) this._recoilRight--;
    if (this._recoilLeft > 0) this._recoilLeft--;
  }

  shootRight(xPos, yPos) {
    this._recoilRight = CellGun.RECOIL_TIME;
    this._bullets.push(
      new MovableElement(
        xPos + 17,
        yPos,
        randomColor(),
        CellGun.BULLET_RADIUS,
        1,
        CellGun.BULLET_VELOCITY
      )
    );
  }

  shootLeft(xPos, yPos) {
    this._recoilLeft = CellGun.RECOIL_TIME;
    this._bullets.push(
      new MovableElement(
        xPos - 17,
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
        bullet.destroy();
        return true;
      }
    }
    return false;
  }

  public get bullets(): MovableElement[] {
    return this._bullets;
  }

  public get recoilRight(): number {
    return this._recoilRight;
  }

  public get recoilLeft(): number {
    return this._recoilLeft;
  }
}
