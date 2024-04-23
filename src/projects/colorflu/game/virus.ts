import { LEVEL_LENGTH } from '../shared/level';
import { palette } from '../shared/palette';
import { radialDistance } from '../shared/radial-distance';
import {
  randomBetween,
  randomPosition,
  randomVelocity,
} from '../shared/random';
import { WindowDimensions } from '../shared/window-dimensions';
import { ExplodableElement } from './explodable-element';
import { MovableElement } from './movable-element';
import { PositionableElement } from './positionable-element';
import { Restorable } from './restorable.interface';
import { Seekable } from './seekable.interface';
import { WhiteBloodCell } from './white-blood-cell';

type DockQuadrant = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export class Virus
  extends ExplodableElement
  implements Seekable, Restorable<Virus>
{
  public static RADIUS = 8;
  public static PLASMID_RADIUS = 2.5;
  private static DOCKING_SPEED = 0.1;
  private static ALPHA = 0.1;
  private static INJECTION_OFFSET = WhiteBloodCell.RADIUS;
  private static MAX_VELOCITY = 2;
  private static SEEK_ACCELERATION = 0.04;

  private _docking = false;
  private _dockQuadrant?: DockQuadrant;
  private _dockingAngle = 0;
  private _dockingXVel = 0;
  private _dockingYVel = 0;
  private _injectionStartX;
  private _injectionStartY;
  private _injectionEndX;
  private _injectionEndY;

  private _infected = false;
  private _plasmidXPos;
  private _plasmidYPos;

  private _seeking = false;
  private _seekingCooldown = false;

  constructor(dimensions: WindowDimensions, xPos?: number, yPos?: number) {
    super(
      xPos != undefined
        ? xPos
        : randomBetween(LEVEL_LENGTH / 2, LEVEL_LENGTH + dimensions.width / 2),
      randomPosition(dimensions.height),
      palette.red,
      Virus.RADIUS,
      Virus.ALPHA,
      randomBetween(-0.7, 0.7), // randomVelocity(),
      randomBetween(-0.7, 0.7) // randomVelocity()
    );
  }

  override restore(data: Virus) {
    this._docking = data._docking;
    this._dockQuadrant = data._dockQuadrant;
    this._dockingAngle = data._dockingAngle;
    this._dockingXVel = data._dockingXVel;
    this._injectionStartX = data._injectionStartX;
    this._injectionStartY = data._injectionStartY;
    this._injectionEndX = data._injectionEndX;
    this._injectionEndY = data._injectionEndY;
    this._infected = data._infected;
    this._plasmidXPos = data._plasmidXPos;
    this._plasmidYPos = data._plasmidYPos;
    this._seeking = data._seeking;
    this._seekingCooldown = data._seekingCooldown;
    this._destroyed = data._destroyed;
    super.restore(data);
  }

  isInRange(target: PositionableElement): boolean {
    return radialDistance(this, target) < 10 * WhiteBloodCell.RADIUS;
  }

  seek(target: MovableElement): void {
    this._seeking = true;
    this._seekingCooldown = false;
    if (target.xPos > this._xPos) {
      if (target.xVelocity >= 0) this._xVelocity += Virus.SEEK_ACCELERATION;
    } else {
      if (target.xVelocity <= 0) this._xVelocity -= Virus.SEEK_ACCELERATION;
    }
    if (target.yPos > this._yPos) {
      if (target.yVelocity >= 0) this._yVelocity += Virus.SEEK_ACCELERATION;
    } else {
      if (target.yVelocity <= 0) this._yVelocity -= Virus.SEEK_ACCELERATION;
    }
    if (this._xVelocity > Virus.MAX_VELOCITY)
      this._xVelocity = Virus.MAX_VELOCITY;
    if (this._xVelocity < -Virus.MAX_VELOCITY)
      this._xVelocity = -Virus.MAX_VELOCITY;
    if (this._yVelocity > Virus.MAX_VELOCITY)
      this._yVelocity = Virus.MAX_VELOCITY;
    if (this._yVelocity < -Virus.MAX_VELOCITY)
      this._yVelocity = -Virus.MAX_VELOCITY;
  }

  endSeek(): void {
    this._seeking = false;
    this._seekingCooldown = true;
  }

  isSeeking(): boolean {
    return this._seeking;
  }

  private _decelerateAfterSeek(): void {
    let decelX =
      Math.abs(this._xVelocity) <= Virus.SEEK_ACCELERATION
        ? 0
        : this._xVelocity > 0
        ? -1
        : 1;
    let decelY =
      Math.abs(this._yVelocity) <= Virus.SEEK_ACCELERATION
        ? 0
        : this._yVelocity > 0
        ? -1
        : 1;
    if (!decelX && !decelY) {
      this._seekingCooldown = false;
      this._xVelocity = randomBetween(-0.7, 0.7);
      this._yVelocity = randomBetween(-0.7, 0.7);
    } else {
      this._xVelocity += Virus.SEEK_ACCELERATION * decelX;
      this._yVelocity += Virus.SEEK_ACCELERATION * decelY;
    }
  }

  override update(dims: WindowDimensions, host: WhiteBloodCell): void {
    if (this._infected) {
      if (this._docking) {
        this._xVelocity += this._dockingXVel;
        this._yVelocity += this._dockingYVel;
        this._injectionStartX += host.xVelocity - this._xScrollVelocity;
        this._injectionStartY += host.yVelocity;
        this._injectionEndX +=
          host.xVelocity + this._dockingXVel - this._xScrollVelocity;
        this._injectionEndY += host.yVelocity + this._dockingYVel;
        this._plasmidXPos +=
          host.xVelocity + this._dockingXVel - this._xScrollVelocity;
        this._plasmidYPos += host.yVelocity + this._dockingYVel;
      } else {
        this._updatePlasmid(host);
        return;
      }
    } else {
      this._enforceScreenLimit(dims);
      if (this._seekingCooldown) {
        this._decelerateAfterSeek();
      }
    }
    super.update();
  }

  startInfection(host: WhiteBloodCell) {
    this._infected = true;
    this._docking = true;
    this._dockingAngle = this._determineDockingAngle(host);
    this._dockingXVel = Virus.DOCKING_SPEED * Math.cos(this._dockingAngle);
    this._dockingYVel = Virus.DOCKING_SPEED * Math.sin(this._dockingAngle);
    this._dockQuadrant = this._determineDockQuadrant(host);

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

  completeInfection() {
    this._docking = false;
    this._xPos = this._plasmidXPos;
    this._yPos = this._plasmidYPos;
    this._xVelocity = randomVelocity();
    this._yVelocity = randomVelocity();
  }

  private _determineDockingAngle(host: WhiteBloodCell): number {
    let xDelta = Math.abs(host.xPos - this._xPos);
    let yDelta = Math.abs(host.yPos - this._yPos);
    return Math.atan(yDelta / xDelta);
  }

  private _determineDockQuadrant(host: WhiteBloodCell) {
    if (this._xPos < host.xPos) {
      if (this._yPos < host.yPos) {
        return 'Q1';
      } else {
        return 'Q4';
      }
    } else {
      if (this._yPos < host.yPos) {
        return 'Q2';
      } else {
        return 'Q3';
      }
    }
  }

  private _updatePlasmid(host: WhiteBloodCell) {
    let prevX = this._xPos;
    let prevY = this._yPos;
    this._xPos += this._xVelocity + host.xVelocity - this.xScrollVelocity;
    this._yPos += this._yVelocity + host.yVelocity;
    if (
      radialDistance(host, this) >=
      host.radius - 1.5 * Virus.PLASMID_RADIUS
    ) {
      // reverse to just cell movement and change velocity
      this._xPos = prevX + host.xVelocity - this.xScrollVelocity;
      this._yPos = prevY + host.yVelocity;
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

  public get seekingCooldown(): boolean {
    return this._seekingCooldown;
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

  public get infected(): boolean {
    return this._infected;
  }
}
