import { palette } from '../shared/palette';
import { radialDistance } from '../shared/radial-distance';
import {
  WindowDimensions,
  getWindowDimensions,
} from '../shared/window-dimensions';
import { CellGun } from './cell-gun';
import { CellShield } from './cell-shield';
import { ControlType } from './control-type.enum';
import { ControllableElement } from './controllable-element';
import { Virus } from './virus';

export class WhiteBloodCell extends ControllableElement {
  public static RADIUS = 25;
  private static MAX_VELOCITY = 3;
  private static COLOR = palette.pink;
  private static ALPHA = 1;

  private _infectedViruses: Virus[] = [];
  private _shield: CellShield;
  private _gun: CellGun;

  private _pain = 0;

  constructor(dimensions: WindowDimensions) {
    super(
      dimensions.width / 3, // initial xPos
      dimensions.height / 2, // initial yPos
      WhiteBloodCell.COLOR,
      WhiteBloodCell.RADIUS,
      WhiteBloodCell.ALPHA,
      WhiteBloodCell.MAX_VELOCITY
    );
    this._shield = new CellShield(this);
    this._gun = new CellGun();
  }

  override restore(data: WhiteBloodCell) {
    this._infectedViruses = data._infectedViruses.map((v) => {
      const virus = new Virus(getWindowDimensions());
      virus.restore(v);
      if (virus.docking) {
        virus.xPos = this._xPos;
        virus.yPos = this._yPos;
        virus.completeInfection();
      }
      return virus;
    });
    this._shield.restore(data._shield);
    super.restore(data);
  }

  override update(dims: WindowDimensions) {
    if (this._pain > 0) {
      console.log(this._pain);
      this._pain--;
    }
    if (this._infectedViruses.length > 5) {
      this.explode();
    }
    super.update(dims);
    this._infectedViruses.forEach((v, i) => {
      if (v.docking) {
        if (radialDistance(this, v) < this._radius - v.radius) {
          v.completeInfection();
        } else {
          v.xScrollVelocity = this._xScrollVelocity;
          v.xVelocity = this._xVelocity;
          v.yVelocity = this._yVelocity;
          v.update(dims, this);
        }
      } else {
        v.xScrollVelocity = this._xScrollVelocity;
        v.update(dims, this);
      }
    });
    this._shield.update(this);
    this._gun.bullets
      .filter((b) => !b.isDestroyed())
      .forEach((b) => {
        b.xScrollVelocity = this._xScrollVelocity;
        b.update();
      });
  }

  infect(virus: Virus) {
    this._pain = 10;
    virus.startInfection(this);
    this._infectedViruses.push(virus);
  }

  override applyControl(control: ControlType): void {
    switch (control) {
      case ControlType.SHOOT:
        this._gun.fire(this._xPos + this._radius, this._yPos);
        break;
    }
    super.applyControl(control);
  }

  public get infectedViruses(): Virus[] {
    return this._infectedViruses;
  }

  public get shield(): CellShield {
    return this._shield;
  }

  public get gun(): CellGun {
    return this._gun;
  }

  public get pain(): number {
    return this._pain;
  }
}
