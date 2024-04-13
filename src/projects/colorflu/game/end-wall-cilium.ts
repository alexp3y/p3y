import { LEVEL_LENGTH } from '../shared/level';
import { palette } from '../shared/palette';
import { WindowDimensions } from '../shared/window-dimensions';
import { Cilium, CellWallType } from './cilium';

export class EndWallCilium extends Cilium {
  constructor(yPos: number, dim: WindowDimensions) {
    super(yPos, palette.red, 60, CellWallType.START, 20);
    this._xPos = LEVEL_LENGTH + dim.width / 2;
  }

  override update(dim: WindowDimensions): void {
    super.update();
    if (this._xPos < dim.width) this._xPos = dim.width;
  }
}
