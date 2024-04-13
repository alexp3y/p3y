import { palette } from '../shared/palette';
import { WindowDimensions } from '../shared/window-dimensions';
import { ControllableElement } from './controllable-element';
import { Virus } from './virus';

export class WhiteBloodCell extends ControllableElement {
  private static RADIUS = 25;
  private static MAX_VELOCITY = 3;
  private static COLOR = palette.pink;

  private _dockingViruses: Virus[] = [];
  private _infectedViruses: Virus[] = [];

  constructor(dimensions: WindowDimensions) {
    super(
      dimensions.width / 3, // initial xPos
      dimensions.height / 2, // initial yPos
      WhiteBloodCell.COLOR,
      WhiteBloodCell.RADIUS,
      WhiteBloodCell.MAX_VELOCITY
    );
  }

  override update(dims: WindowDimensions, xProgress: number) {
    super.update(dims, xProgress);
    this._dockingViruses.forEach((d) => {
      d.xScrollVelocity = this._xScrollVelocity;
      d.xVelocity = this._xVelocity;
      d.yVelocity = this._yVelocity;
      d.update(dims);
    });
  }

  dockVirus(virus: Virus) {
    this._dockingViruses.push(virus);
  }

  public get dockingViruses(): Virus[] {
    return this._dockingViruses;
  }
}
