import { CFColor } from '../shared/palette';
import { radialDistance } from '../shared/radial-distance';

export class PositionableElement {
  protected _xScrollVelocity: number = 0;
  protected _alpha = 1;
  protected _destroyed = false;

  constructor(
    protected _xPos: number,
    protected _yPos: number,
    protected _color: CFColor,
    protected _radius: number
  ) {}

  update(p1?: any, p2?: any) {
    this._xPos -= this._xScrollVelocity;
  }

  isCollidedWith(element: PositionableElement) {
    return radialDistance(this, element) <= this.radius + element.radius;
  }

  destroy() {
    this._destroyed = true;
  }

  public get destroyed(): boolean {
    return this._destroyed;
  }

  public get alpha(): number {
    return this._alpha;
  }

  public get xScrollVelocity(): number {
    return this._xScrollVelocity;
  }

  public set xScrollVelocity(v: number) {
    this._xScrollVelocity = v;
  }

  public get xPos(): number {
    return this._xPos;
  }

  public get yPos(): number {
    return this._yPos;
  }

  public get color(): CFColor {
    return this._color;
  }

  public get radius(): number {
    return this._radius;
  }

  public set xPos(v: number) {
    this._xPos = v;
  }

  public set yPos(v: number) {
    this._yPos = v;
  }

  public set color(v: CFColor) {
    this._color = v;
  }

  public set radius(v: number) {
    this._radius = v;
  }
}
