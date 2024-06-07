import { Destroyable } from './interface/destroyable.interface';
import { PositionableElement } from './positionable-element';

export class MovableElement extends PositionableElement implements Destroyable {
  protected _xVelocity: number = 0;
  protected _yVelocity: number = 0;
  protected _destroyed = false;

  constructor(xPos, yPos, color, radius, alpha = 1, xVel = 0, yVel = 0) {
    super(xPos, yPos, color, radius, alpha);
    this._xVelocity = xVel ? xVel : 0;
    this._yVelocity = yVel ? yVel : 0;
  }
  destroy(): void {
    this._destroyed = true;
  }
  isDestroyed(): boolean {
    return this._destroyed;
  }

  update(p1?: any, p2?: any) {
    this._xPos += this._xVelocity;
    this._yPos += this._yVelocity;
    super.update();
  }

  override restore(data: MovableElement) {
    this._xVelocity = data._xVelocity;
    this._yVelocity = data._yVelocity;
    super.restore(data);
  }

  public get xVelocity(): number {
    return this._xVelocity;
  }

  public get yVelocity(): number {
    return this._yVelocity;
  }

  public set xVelocity(v: number) {
    this._xVelocity = v;
  }

  public set yVelocity(v: number) {
    this._yVelocity = v;
  }
}
