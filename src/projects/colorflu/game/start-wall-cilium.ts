import { randomColor } from '../shared/random';
import { CellWallType, Cilium } from './cilium';

export class StartWallCilium extends Cilium {
  constructor(yPos) {
    super(yPos, randomColor(), 120, CellWallType.START, 200);
    this._xPos = 0;
  }

  override update(): void {
    super.update();
    if (this._xPos > 0) this._xPos = 0;
  }
}
