import { palette } from '../shared/palette';
import { randomColor } from '../shared/random';
import { Cilium, CellWallType } from './cilium';

export class StartWallCilium extends Cilium {
  constructor(yPos) {
    super(yPos, randomColor(), 60, CellWallType.START, 20);
    this._xPos = 0;
  }

  override update(): void {
    super.update();
    if (this._xPos > 0) this._xPos = 0;
  }
}
