import { Cilium } from './game/cilium';
import { ControlType } from './game/control-type.enum';
import { EndWallCilium } from './game/end-wall-cilium';
import { RedBloodCell } from './game/red-blood-cell';
import { Restorable } from './game/restorable.interface';
import { StartWallCilium } from './game/start-wall-cilium';
import { Virus } from './game/virus';
import { WhiteBloodCell } from './game/white-blood-cell';
import { WindowDimensions } from './shared/window-dimensions';

export class ColorfluGame implements Restorable<ColorfluGame> {
  private _cell: WhiteBloodCell;
  private _viruses: Virus[] = [];
  private _redBloodCells: RedBloodCell[] = [];
  private _startCilia: Cilium[] = [];
  private _endCilia: Cilium[] = [];
  private _rendered: boolean = false;

  constructor(private _dimensions: WindowDimensions, savedGameData?: string) {
    this._cell = new WhiteBloodCell(this._dimensions);
    let x = 0;
    while (x < 100) {
      x++;
      this._redBloodCells.push(new RedBloodCell(this._dimensions));
    }
    let y = 0;
    while (y < this._dimensions.height) {
      y += 3;
      this._startCilia.push(new StartWallCilium(y));
      this.endCilia.push(new EndWallCilium(y, this._dimensions));
    }
    let z = 0;
    while (z < 200) {
      z++;
      this._viruses.push(new Virus(this._dimensions));
    }
  }

  public restore(data: ColorfluGame) {
    this._cell.restore(data._cell);
    this._viruses = data._viruses.map((v) => {
      const virus = new Virus(this._dimensions);
      virus.restore(v);
      return virus;
    });
    // position new cilium onto old wall points
    let startCiliaX = (data._startCilia[0] as any)._xPos;
    let endCiliaX = (data._endCilia[0] as any)._xPos;
    this._startCilia.forEach((c) => (c.xPos = startCiliaX));
    this._endCilia.forEach((c) => (c.xPos = endCiliaX));
  }

  update(clock: number) {
    if (clock % 50 === 0 && this._cell.progress < 150) {
      this._viruses.push(new Virus(this._dimensions, 0));
    }
    this._cell.update(this._dimensions);
    this._viruses
      .filter((v) => !v.infected)
      .forEach((v) => {
        v.xScrollVelocity = this._cell.xScrollVelocity;
        if (!v.isExploded()) {
          if (this._cell.shield.isCollidedWith(v) || this._cell.gun.isShot(v)) {
            v.explode();
          } else if (v.isInRange(this._cell)) {
            v.seek(this._cell);
            if (v.isCollidedWith(this._cell)) {
              this._cell.infect(v);
            }
          } else if (v.isSeeking()) {
            v.endSeek();
          }
        }
        v.update(this._dimensions, this._cell);
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

  resizeWindow(dim: WindowDimensions) {
    this._dimensions = dim;
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
    if (control !== ControlType.PAUSE) {
      console.log(ControlType[control]);
      this._cell.applyControl(control);
      this._cell.shield.applyControl(control);
    }
  }

  public releaseControl(control: ControlType) {
    if (control !== ControlType.PAUSE) {
      this._cell.releaseControl(control);
      this._cell.shield.releaseControl(control);
    }
  }

  public get isScreenAttached(): boolean {
    return this._rendered;
  }

  public set rendered(v: boolean) {
    this._rendered = v;
  }
}
