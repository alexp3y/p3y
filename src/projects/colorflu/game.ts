import { BottomCilium } from './game/bottom-cillium';
import { Cilium } from './game/cilium';
import { ControlType } from './game/control-type.enum';
import { Restorable } from './game/interface/restorable.interface';
import { RedBloodCell } from './game/red-blood-cell';
import { Virus } from './game/virus';
import { WhiteBloodCell } from './game/white-blood-cell';
import { LEVEL_LENGTH } from './shared/level';
import { palette } from './shared/palette';
import { WindowDimensions } from './shared/window-dimensions';

export class ColorfluGame implements Restorable<ColorfluGame> {
  private _cell: WhiteBloodCell;
  private _viruses: Virus[] = [];
  private _redBloodCells: RedBloodCell[] = [];
  private _startCilia: Cilium[] = [];
  private _endCilia: Cilium[] = [];
  private _rendered: boolean = false;
  private _bottomCilia: BottomCilium[] = [];
  private _topCilia: BottomCilium[] = [];
  // private _monsterCell: MonsterCell;

  constructor(private _dimensions: WindowDimensions, savedGameData?: string) {
    this._cell = new WhiteBloodCell(this._dimensions);
    let x = 0;
    while (x < LEVEL_LENGTH + this._dimensions.width) {
      x += 5;
      // this._startCilia.push(new StartWallCilium(y));
      // this._endCilia.push(new EndWallCilium(y, this._dimensions));
      this._topCilia.push(new BottomCilium(x, 0, palette.green, 130));
      this._bottomCilia.push(
        new BottomCilium(x, this._dimensions.height, palette.green, 130)
      );
    }
    let z = 0;
    while (z < 80) {
      z++;
      this._viruses.push(new Virus(this._dimensions));
      this._redBloodCells.push(new RedBloodCell(this._dimensions));
    }
    // this._monsterCell = new MonsterCell(
    //   (2 * this._dimensions.width) / 3,
    //   this._dimensions.height / 2
    // );
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
    // if (clock % 50 === 0 && this._cell.progress < 150) {
    //   this._viruses.push(new Virus(this._dimensions, 0));
    // }
    this._cell.update(clock, this._dimensions);
    this._viruses = this._viruses.filter((v) => !v.isDestroyed());
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
    this._bottomCilia.forEach((c) => {
      c.xScrollVelocity = this._cell.xScrollVelocity;
      c.update(this._cell);
    });
    this._topCilia.forEach((c) => {
      c.xScrollVelocity = this._cell.xScrollVelocity;
      c.update(this._cell);
    });
    // this._monsterCell.xScrollVelocity = this._cell.xScrollVelocity;
    // this._monsterCell.update();
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

  public get bottomCilia(): BottomCilium[] {
    return this._bottomCilia;
  }

  public get topCilia(): BottomCilium[] {
    return this._topCilia;
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

  // public get monsterCell(): MonsterCell {
  //   return this._monsterCell;
  // }
}
