import { LEVEL_LENGTH } from '../shared/level';
import { CFColor } from '../shared/palette';
import { radialDistance } from '../shared/radial-distance';
import {
  randomBetween,
  randomPosition,
  randomVelocity,
} from '../shared/random';
import { WindowDimensions } from '../shared/window-dimensions';
import { MovableElement } from './movable-element';
import { WhiteBloodCell } from './white-blood-cell';

type DockQuadrant = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export class Virus extends MovableElement {
  public static RADIUS = 7;
  public static PLASMID_RADIUS = 2;
  private static DOCKING_SPEED = 0.1;
  private static ALPHA = 0.1;
  private static INJECTION_OFFSET = WhiteBloodCell.RADIUS - 2;

  private _host?: WhiteBloodCell;
  private _docking = false;
  private _dockQuadrant?: DockQuadrant;
  private _dockingAngle = 0;
  private _dockingXVel = 0;
  private _dockingYVel = 0;
  private _injectionStartX;
  private _injectionStartY;
  private _injectionEndX;
  private _injectionEndY;

  private _dockingCompleted = false;
  private _plasmidXPos;
  private _plasmidYPos;

  constructor(dimensions: WindowDimensions) {
    super(
      randomBetween(LEVEL_LENGTH / 2, LEVEL_LENGTH + dimensions.width / 2),
      randomPosition(dimensions.height),
      { hex: '#e22b2b' } as CFColor,
      Virus.RADIUS,
      Virus.ALPHA,
      randomBetween(-1, 1), // randomVelocity(),
      randomBetween(-1, 1) // randomVelocity()
    );
  }

  override update(dims: WindowDimensions): void {
    if (this._dockingCompleted) {
      this._updatePlasmid();
    } else {
      if (this._docking) {
        this._xVelocity += this._dockingXVel;
        this._yVelocity += this._dockingYVel;
        this._injectionStartX += this._host!.xVelocity - this._xScrollVelocity;
        this._injectionStartY += this._host!.yVelocity;
        this._injectionEndX +=
          this._host!.xVelocity + this._dockingXVel - this._xScrollVelocity;
        this._injectionEndY += this._host!.yVelocity + this._dockingYVel;
        this._plasmidXPos +=
          this._host!.xVelocity + this._dockingXVel - this._xScrollVelocity;
        this._plasmidYPos += this._host!.yVelocity + this._dockingYVel;
      } else {
        this._enforceScreenLimit(dims);
      }
      super.update();
    }
  }

  startDocking(host: WhiteBloodCell) {
    this._host = host;
    this._docking = true;
    this._dockingAngle = this._determineDockingAngle();
    this._dockingXVel = Virus.DOCKING_SPEED * Math.cos(this._dockingAngle);
    this._dockingYVel = Virus.DOCKING_SPEED * Math.sin(this._dockingAngle);
    this._dockQuadrant = this._determineDockQuadrant();

    let injectionStartXOffset = Math.cos(this._dockingAngle) * host.radius;
    let injectionStartYOffset = Math.sin(this._dockingAngle) * host.radius;
    let injectionEndXOffset =
      Math.cos(this._dockingAngle) * Virus.INJECTION_OFFSET;
    let injectionEndYOffset =
      Math.sin(this._dockingAngle) * Virus.INJECTION_OFFSET;
    let plasmidXOffset =
      Math.cos(this._dockingAngle) *
      (Virus.INJECTION_OFFSET - Virus.PLASMID_RADIUS);
    let plasmidYOffset =
      Math.sin(this._dockingAngle) *
      (Virus.INJECTION_OFFSET - Virus.PLASMID_RADIUS);

    switch (this._dockQuadrant) {
      case 'Q1':
        this._injectionStartX = host.xPos - injectionStartXOffset;
        this._injectionStartY = host.yPos - injectionStartYOffset;
        this._injectionEndX = host.xPos - injectionEndXOffset;
        this._injectionEndY = host.yPos - injectionEndYOffset;
        this._plasmidXPos = host.xPos - plasmidXOffset;
        this._plasmidYPos = host.yPos - plasmidYOffset;
        break;
      case 'Q2':
        this._injectionStartX = host.xPos + injectionStartXOffset;
        this._injectionStartY = host.yPos - injectionStartYOffset;
        this._injectionEndX = host.xPos + injectionEndXOffset;
        this._injectionEndY = host.yPos - injectionEndYOffset;
        this._plasmidXPos = host.xPos + plasmidXOffset;
        this._plasmidYPos = host.yPos - plasmidYOffset;
        this._dockingXVel *= -1;
        break;
      case 'Q3':
        this._injectionStartX = host.xPos + injectionStartXOffset;
        this._injectionStartY = host.yPos + injectionStartYOffset;
        this._injectionEndX = host.xPos + injectionEndXOffset;
        this._injectionEndY = host.yPos + injectionEndYOffset;
        this._plasmidXPos = host.xPos + plasmidXOffset;
        this._plasmidYPos = host.yPos + plasmidYOffset;
        this._dockingYVel *= -1;
        this._dockingXVel *= -1;
        break;
      case 'Q4':
        this._injectionStartX = host.xPos - injectionStartXOffset;
        this._injectionStartY = host.yPos + injectionStartYOffset;
        this._injectionEndX = host.xPos - injectionEndXOffset;
        this._injectionEndY = host.yPos + injectionEndYOffset;
        this._plasmidXPos = host.xPos - plasmidXOffset;
        this._plasmidYPos = host.yPos + plasmidYOffset;
        this._dockingYVel *= -1;
        break;
      default:
        break;
    }
  }

  completeDocking() {
    this._docking = false;
    this._dockingCompleted = true;
    this._xPos = this._plasmidXPos;
    this._yPos = this._plasmidYPos;
    this._xVelocity = randomVelocity();
    this._yVelocity = randomVelocity();
  }

  private _determineDockingAngle(): number {
    let xDelta = Math.abs(this._host!.xPos - this._xPos);
    let yDelta = Math.abs(this._host!.yPos - this._yPos);
    return Math.atan(yDelta / xDelta);
  }

  private _determineDockQuadrant() {
    if (this._xPos < this._host!.xPos) {
      if (this._yPos < this._host!.yPos) {
        return 'Q1';
      } else {
        return 'Q4';
      }
    } else {
      if (this._yPos < this._host!.yPos) {
        return 'Q2';
      } else {
        return 'Q3';
      }
    }
  }

  private _updatePlasmid() {
    let prevX = this._xPos;
    let prevY = this._yPos;
    this._xPos +=
      this._xVelocity + this._host!.xVelocity - this.xScrollVelocity;
    this._yPos += this._yVelocity + this._host!.yVelocity;
    if (
      radialDistance(this._host!, this) >=
      this._host!.radius - 1.5 * Virus.PLASMID_RADIUS
    ) {
      // reverse to just cell movement and change velocity
      this._xPos = prevX + this._host!.xVelocity - this.xScrollVelocity;
      this._yPos = prevY + this._host!.yVelocity;
      this._xVelocity = randomBetween(-0.3, 0.3);
      this._yVelocity = randomBetween(-0.3, 0.3);
    }
  }

  private _enforceScreenLimit(dims: WindowDimensions) {
    if (this._xPos < 0 - 50 || this._xPos > LEVEL_LENGTH + 50) {
      this._xVelocity = -this._xVelocity;
    }
    if (this._yPos < 0 - 50 || this._yPos > dims.height + 50) {
      this._yVelocity = -this._yVelocity;
    }
  }

  public get docking(): boolean {
    return this._docking;
  }

  public get dockAngle(): number {
    return this._dockingAngle;
  }

  public get dockingQuadrant(): DockQuadrant {
    return this._dockQuadrant!;
  }

  public get injectionStartX(): number {
    return this._injectionStartX;
  }

  public get injectionStartY(): number {
    return this._injectionStartY;
  }

  public get injectionEndX(): number {
    return this._injectionEndX;
  }

  public get injectionEndY(): number {
    return this._injectionEndY;
  }

  public get plasmidXPos(): number {
    return this._plasmidXPos;
  }

  public get plasmidYPos(): number {
    return this._plasmidYPos;
  }
}
