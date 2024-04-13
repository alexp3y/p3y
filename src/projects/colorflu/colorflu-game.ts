import { Cilium } from './game/cilium';
import { ControlType } from './game/control-type';
import { EndWallCilium } from './game/end-wall-cilium';
import { RedBloodCell } from './game/red-blood-cell';
import { StartWallCilium } from './game/start-wall-cilium';
import { Virus } from './game/virus';
import { WhiteBloodCell } from './game/white-blood-cell';
import { WindowDimensions } from './shared/window-dimensions';

export class ColorfluGame {
  private _clock = 0;
  private _progress = 0;
  private _cell: WhiteBloodCell;
  private _viruses: Virus[] = [];
  private _redBloodCells: RedBloodCell[] = [];
  private _startCilia: Cilium[] = [];
  private _endCilia: Cilium[] = [];

  constructor(private _dimensions: WindowDimensions) {
    this._cell = new WhiteBloodCell(this._dimensions);
    let x = 0;
    while (x < 70) {
      x++;
      this._redBloodCells.push(new RedBloodCell(this._dimensions));
      this._viruses.push(new Virus(this._dimensions));
    }
    let y = 0;
    while (y < this._dimensions.height) {
      y += 3;
      this._startCilia.push(new StartWallCilium(y));
      this.endCilia.push(new EndWallCilium(y, this._dimensions));
    }
  }

  public update() {
    this._clock++;
    this._cell.update(this._dimensions, this._progress);
    this._viruses.forEach((v, i) => {
      v.xScrollVelocity = this._cell.xScrollVelocity;
      v.update(this._dimensions);
      if (v.isCollidedWith(this._cell)) {
        this._cell.dockVirus(this._viruses.splice(i, 1)[0]);
      }
    });
    this._redBloodCells.forEach((c) => {
      c.xScrollVelocity = this._cell.xScrollVelocity;
      c.update(this._dimensions);
    });
    this._startCilia.forEach((c) => {
      c.xScrollVelocity = this._cell.xScrollVelocity;
      c.update();
    });
    this._endCilia.forEach((c) => {
      c.xScrollVelocity = this._cell.xScrollVelocity;
      c.update(this._dimensions);
    });
  }

  public resizeWindow(dim: WindowDimensions) {
    this._dimensions = dim;
  }

  public get clock(): number {
    return this._clock;
  }

  public get cell(): WhiteBloodCell {
    return this._cell;
  }

  public get viruses(): Virus[] {
    return this._viruses;
  }

  public get redBloodCells(): RedBloodCell[] {
    return this._redBloodCells;
  }

  public get startCilia(): Cilium[] {
    return this._startCilia;
  }

  public get endCilia(): Cilium[] {
    return this._endCilia;
  }

  public applyControl(control: ControlType) {
    if (ControlType[control].startsWith('GO')) {
      this._cell.applyControl(control);
    }
  }

  public releaseControl(control: ControlType) {
    if (ControlType[control].startsWith('GO')) {
      this._cell.releaseControl(control);
    }
  }
}
