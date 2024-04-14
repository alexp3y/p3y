import { palette } from '../shared/palette';
import { radialDistance } from '../shared/radial-distance';
import { WindowDimensions } from '../shared/window-dimensions';
import { ControllableElement } from './controllable-element';
import { Virus } from './virus';

export class WhiteBloodCell extends ControllableElement {
  public static RADIUS = 25;
  private static MAX_VELOCITY = 3;
  private static COLOR = palette.pink;
  private static ALPHA = 1;

  private _dockingViruses: Virus[] = [];
  private _infectedViruses: Virus[] = [];

  constructor(dimensions: WindowDimensions) {
    super(
      dimensions.width / 3, // initial xPos
      dimensions.height / 2, // initial yPos
      WhiteBloodCell.COLOR,
      WhiteBloodCell.RADIUS,
      WhiteBloodCell.ALPHA,
      WhiteBloodCell.MAX_VELOCITY
    );
  }

  override update(dims: WindowDimensions, xProgress: number) {
    super.update(dims, xProgress);
    this._dockingViruses.forEach((v, i) => {
      if (radialDistance(this, v) < this._radius - v.radius) {
        this.addInfection(this._dockingViruses.splice(i, 1)[0]);
      } else {
        v.xScrollVelocity = this._xScrollVelocity;
        v.xVelocity = this._xVelocity;
        v.yVelocity = this._yVelocity;
        v.update(dims);
      }
    });
    this._infectedViruses.forEach((v) => {
      v.xScrollVelocity = this._xScrollVelocity;
      v.update(dims);
    });
  }

  dockVirus(virus: Virus) {
    virus.startDocking(this);
    this._dockingViruses.push(virus);
  }

  addInfection(virus: Virus) {
    virus.completeDocking();
    this._infectedViruses.push(virus);
  }

  public get dockingViruses(): Virus[] {
    return this._dockingViruses;
  }

  public get infectedViruses(): Virus[] {
    return this._infectedViruses;
  }
}
