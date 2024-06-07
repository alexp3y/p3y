import { M_PLUS_1 } from 'next/font/google';
import { ColorfluGame } from './game';
import { CellShield, SHIELD_COLORS } from './game/cell-shield';
import { Cilium } from './game/cilium';
import { ExplodableElement } from './game/explodable-element';
import { PositionableElement } from './game/positionable-element';
import { Virus } from './game/virus';
import { WhiteBloodCell } from './game/white-blood-cell';
import { CFColor, colorBlack, colorWhite, palette } from './shared/palette';
import { NAVBAR_HEIGHT, WindowDimensions } from './shared/window-dimensions';
import { ColorfluSplashScreen } from './splash-screen';
import {
  BottomCilium,
  CiliumLocation,
  CiliumSize,
} from './game/bottom-cillium';
import { MonsterCell } from './game/monster-cell';

export class ColorfluGraphics {
  private static BG_GRADIENT_OFFSET = 0;

  private _ctx: CanvasRenderingContext2D;
  private _bgGradientBaseShade = 255;
  private _bgGradientOffsetShade = 255 - ColorfluGraphics.BG_GRADIENT_OFFSET;

  constructor(
    private _canvas: HTMLCanvasElement,
    private _dims: WindowDimensions
  ) {
    this._canvas.setAttribute('height', `${this._dims.height - NAVBAR_HEIGHT}`);
    this._canvas.setAttribute('width', `${this._dims.width}`);
    this._ctx = this._canvas.getContext('2d', { alpha: false })!;
  }

  public resizeWindow(dim: WindowDimensions) {
    this._dims = dim;
    this._canvas.setAttribute('height', `${this._dims.height - NAVBAR_HEIGHT}`);
    this._canvas.setAttribute('width', `${this._dims.width}`);
  }

  public renderSplashScreen(splashScreen: ColorfluSplashScreen) {
    this._ctx.fillStyle = this._hex2rgba(palette.red.hex, 1);
    this._ctx.fillRect(0, 0, this._dims.width, this._dims.height);
    this._ctx.fillStyle = this._hex2rgba(colorWhite.hex, 0.95);
    this._ctx.fillRect(0, 0, this._dims.width, this._dims.height);
    splashScreen.redBloodCells.forEach((v, i) => this._renderRedBloodCell(v));
    this._drawCircle(
      50,
      this._dims.height,
      this._dims.height / 2,
      this._hex2rgba(palette.pink.hex, 0.5)
    );
    this._drawCircle(
      50,
      this._dims.height,
      this._dims.height / 3,
      this._hex2rgba(colorWhite.hex, 0.3)
    );
    this._drawRing(
      50,
      this._dims.height,
      this._dims.height / 2,
      this._hex2rgba(palette.pink.hex, 0.85),
      3
    );
  }

  public renderGame(game: ColorfluGame) {
    game.rendered = true;
    this._clearScreen();
    this._drawBg(game.cell.progress, game.cell.xScrollVelocity);
    game.redBloodCells.forEach((v, i) => this._renderRedBloodCell(v));
    // this._drawCircle(
    //   game.monsterCell.xPos,
    //   game.monsterCell.yPos,
    //   game.monsterCell.radius,
    //   colorWhite.hex
    // );
    this._renderCellShield(game.cell);
    game.viruses
      .filter((v) => v.isExploded)
      .forEach((v) => this._renderExplodedElement(v));
    game.viruses
      .filter((v) => !v.isExploded() && !v.infected)
      .forEach((v, i) => this._renderVirus(v));
    game.bottomCilia.forEach((c, i) => {
      if (!(i % 2)) this._drawCilium(c);
    });
    game.topCilia.forEach((c, i) => {
      if (!(i % 2)) this._drawCilium(c);
    });
    // white blood cell
    this._renderWhiteBloodCell(game.cell);
    // this._renderSpikes(game.monsterCell, 10, colorBlack, 10);
    // this._drawRing(
    //   game.monsterCell.xPos,
    //   game.monsterCell.yPos,
    //   game.monsterCell.radius,
    //   colorBlack.hex
    // );
    // this._drawCircle(
    //   game.monsterCell.xPos,
    //   game.monsterCell.yPos,
    //   game.monsterCell.radius,
    //   this._hex2rgba(colorWhite.hex, 0.3)
    // );
    game.bottomCilia.forEach((c, i) => {
      if (i % 2) this._drawCilium(c);
    });
    game.topCilia.forEach((c, i) => {
      if (i % 2) this._drawCilium(c);
    });
    this._renderHealthMeter(60, game.cell.shield);
    this._renderShieldMeter(120, game.cell.shield);
    this._renderAmmoMeter(180, game.cell.shield);
  }

  private _renderShieldMeter(xPos: number, shield: CellShield) {
    this._roundedRect(
      xPos,
      25,
      35,
      100,
      4 * Math.PI,
      4 * Math.PI,
      colorWhite,
      1,
      true
    );
    if (shield.power >= 4) {
      this._roundedRect(
        xPos,
        25 + 100 - shield.power,
        35,
        shield.power,
        shield.power < 95
          ? shield.power < 90
            ? Math.PI
            : 1.5 * Math.PI
          : 4 * Math.PI,
        4 * Math.PI,
        palette.blue,
        0.7,
        true
      );
      this._roundedRect(
        xPos,
        25,
        35,
        100,
        5 * Math.PI,
        5 * Math.PI,
        colorBlack,
        1
      );
    } else {
      this._roundedRect(
        xPos,
        25,
        35,
        100,
        4 * Math.PI,
        4 * Math.PI,
        palette.red,
        Math.abs(shield.power / 100) + 0.2,
        true
      );
      this._roundedRect(
        xPos,
        25,
        35,
        100,
        5 * Math.PI,
        5 * Math.PI,
        colorBlack,
        1
      );
    }
    this._ctx.fillStyle = colorBlack.hex;
    this._ctx.font = '12px anta';
    this._ctx.fillText('SHIELD', xPos - 2, 142);
  }

  private _renderAmmoMeter(xPos: number, shield: CellShield) {
    this._roundedRect(
      xPos,
      25,
      35,
      100,
      4 * Math.PI,
      4 * Math.PI,
      palette.green,
      1,
      true
    );
    this._roundedRect(
      xPos,
      25,
      35,
      100,
      5 * Math.PI,
      5 * Math.PI,
      colorBlack,
      1
    );
    this._ctx.fillStyle = colorBlack.hex;
    this._ctx.font = '12px anta';
    this._ctx.fillText('AMMO', xPos, 142);
  }

  private _renderHealthMeter(xPos: number, shield: CellShield) {
    this._roundedRect(
      xPos,
      25,
      35,
      100,
      4 * Math.PI,
      4 * Math.PI,
      palette.maroon,
      1,
      true
    );
    this._roundedRect(
      xPos,
      25,
      35,
      100,
      5 * Math.PI,
      5 * Math.PI,
      colorBlack,
      1
    );
    this._ctx.fillStyle = colorBlack.hex;
    this._ctx.font = '12px anta';
    this._ctx.fillText('HEALTH', xPos - 4, 142);
  }

  private _roundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radiusTop: number,
    radiusBottom: number,
    color: CFColor,
    alpha: number,
    fill?: boolean
  ) {
    this._ctx.beginPath();
    this._ctx.moveTo(x, y + radiusTop);
    this._ctx.arcTo(x, y + height, x + radiusBottom, y + height, radiusBottom);
    this._ctx.arcTo(
      x + width,
      y + height,
      x + width,
      y + height - radiusBottom,
      radiusBottom
    );
    this._ctx.arcTo(x + width, y, x + width - radiusTop, y, radiusTop);
    this._ctx.arcTo(x, y, x, y + radiusTop, radiusTop);
    this._ctx.lineWidth = 1.5;
    if (fill) {
      this._ctx.fillStyle = this._hex2rgba(color.hex, alpha);
      this._ctx.fill();
    } else {
      this._ctx.strokeStyle = this._hex2rgba(color.hex, alpha);
      this._ctx.stroke();
    }
  }

  private _renderExplodedElement(el: ExplodableElement) {
    let radIncrement = (2 * Math.PI) / ExplodableElement.INVERSE_FRAGMENT_SIZE;
    let fragmentStartRad = 0;
    let fragmentEndRad = radIncrement;
    el.explodedFragments.forEach((f) => {
      this._drawRing(
        f.xPos,
        f.yPos,
        f.radius,
        this._hex2rgba(f.color.hex, 0.8),
        1.5,
        fragmentEndRad,
        fragmentStartRad
      );
      fragmentStartRad += radIncrement;
      fragmentEndRad += radIncrement;
    });
  }

  private _renderWhiteBloodCell(cell: WhiteBloodCell) {
    cell.infectedViruses
      .filter((v) => v.docking)
      .forEach((v) => this._renderVirus(v));
    this._drawCircle(
      cell.xPos,
      cell.yPos,
      cell.radius,
      this._hex2rgba(cell.color.hex, cell.alpha)
    );
    this._drawCircle(
      cell.xPos,
      cell.yPos,
      Math.floor(cell.radius / 1.5),
      this._hex2rgba(colorWhite.hex, 0.3)
    );
    if (cell.pain > 0) {
      this._drawCircle(
        cell.xPos,
        cell.yPos,
        cell.radius,
        this._hex2rgba(palette.red.hex, 1 - (1 - cell.pain / 10))
      );
    }
    this._drawRing(cell.xPos, cell.yPos, WhiteBloodCell.RADIUS, '#c46c92', 1.5);
    cell.infectedViruses
      .filter((v) => v.docking)
      .forEach((v) => {
        this._renderDockingVirusInjection(v);
        let dockPoint = 0;
        switch (v.dockingQuadrant) {
          case 'Q1':
            dockPoint = v.dockAngle + Math.PI;
            break;
          case 'Q2':
            dockPoint = -v.dockAngle;
            break;
          case 'Q3':
            dockPoint = v.dockAngle;
            break;
          case 'Q4':
            dockPoint = -v.dockAngle + Math.PI;
            break;
          default:
            break;
        }
        this._drawRing(
          cell.xPos,
          cell.yPos,
          WhiteBloodCell.RADIUS,
          this._hex2rgba(colorBlack.hex, 0.8),
          1,
          dockPoint + 0.3,
          dockPoint - 0.3
        );
        this._drawRing(
          v.plasmidXPos,
          v.plasmidYPos,
          Virus.PLASMID_RADIUS,
          this._hex2rgba(colorBlack.hex, 0.8),
          1
        );
      });
    cell.infectedViruses
      .filter((v) => !v.docking)
      .forEach((v) => {
        this._drawCircle(
          v.xPos,
          v.yPos,
          Virus.PLASMID_RADIUS,
          this._hex2rgba(v.color.hex, 0.4)
        );
        this._drawRing(
          v.xPos,
          v.yPos,
          Virus.PLASMID_RADIUS,
          this._hex2rgba(colorBlack.hex, 0.8),
          1
        );
        this._renderPlasmidSpikes(v, 1, colorBlack, 50);
      });
    cell.gun.bullets
      .filter((b) => !b.isDestroyed())
      .forEach((b) => {
        // this._ctx.fillStyle = this._hex2rgba(b.color.hex, 1);
        // this._ctx.fillRect(b.xPos - b.radius, b.yPos - 4, 6, 2);
        // this._ctx.strokeStyle = this._hex2rgba(b.color.hex, 1);
        // this._ctx.lineWidth = 1;
        // this._ctx.beginPath();
        // this._ctx.moveTo(b.xPos - b.radius + 8, b.yPos - 2);
        // this._ctx.lineTo(b.xPos - b.radius + 17, b.yPos - 10);
        // this._ctx.moveTo(b.xPos - b.radius + 8, b.yPos - 2);
        // this._ctx.lineTo(b.xPos - b.radius + 17, b.yPos + 6);
        // this._ctx.stroke();
        this._drawCircle(
          b.xPos,
          b.yPos,
          b.radius,
          this._hex2rgba(b.color.hex, 0.5),
          1
        );
        // this._ctx.fillStyle = this._hex2rgba(colorBlack.hex, 1);
        // this._ctx.strokeStyle = this._hex2rgba(colorBlack.hex, 1);
        this._drawRing(
          b.xPos,
          b.yPos,
          b.radius,
          this._hex2rgba('#000000', 1),
          1
        );
      });
    //alex
    this._ctx.lineWidth = 1.5;
    this._ctx.strokeStyle = this._hex2rgba('#c46c92', 1);
    // this._ctx.fillStyle = this._hex2rgba(palette.green.hex, 0.1);
    this._ctx.fillStyle = cell.gun.recoilLeft
      ? this._hex2rgba(palette.pink.hex, cell.gun.recoilLeft / 8 + 0.1)
      : this._hex2rgba(palette.pink.hex, 0.4);
    this._ctx.strokeRect(
      cell.xPos - cell.radius - 2 - cell.gun.recoilLeft,
      cell.yPos - 4,
      2 + cell.gun.recoilLeft,
      9
    );
    this._ctx.fillRect(
      cell.xPos - cell.radius - 2 - cell.gun.recoilLeft,
      cell.yPos - 4,
      2 + cell.gun.recoilLeft,
      9
    );
    this._ctx.fillStyle = cell.gun.recoilRight
      ? this._hex2rgba(palette.pink.hex, cell.gun.recoilRight / 8 + 0.1)
      : this._hex2rgba(palette.pink.hex, 0.4);
    this._ctx.strokeRect(
      cell.xPos + cell.radius,
      cell.yPos - 4,
      2 + cell.gun.recoilRight,
      9
    );
    this._ctx.fillRect(
      cell.xPos + cell.radius,
      cell.yPos - 4,
      2 + cell.gun.recoilRight,
      9
    );

    if (cell.gun.recoilRight) {
      this._drawPartialCircle(
        cell.xPos + cell.radius + 25,
        cell.yPos - 10,
        15,
        this._hex2rgba(palette.red.hex, cell.gun.recoilRight / 8 - 0.3),
        Math.PI / 5,
        (4 * Math.PI) / 5
      );
      this._drawPartialCircle(
        cell.xPos + cell.radius + 25,
        cell.yPos + 10,
        15,
        this._hex2rgba(palette.red.hex, cell.gun.recoilRight / 10 - 0.3),
        -(4 * Math.PI) / 5,
        -Math.PI / 5
      );
      this._drawPartialCircle(
        cell.xPos + cell.radius + 25,
        cell.yPos - 10,
        14,
        this._hex2rgba(palette.yellow.hex, cell.gun.recoilRight / 10 - 0.4),
        Math.PI / 5,
        (4 * Math.PI) / 5
      );
      this._drawPartialCircle(
        cell.xPos + cell.radius + 25,
        cell.yPos + 10,
        14,
        this._hex2rgba(palette.yellow.hex, cell.gun.recoilRight / 10 - 0.4),
        -(4 * Math.PI) / 5,
        -Math.PI / 5
      );
    }
  }

  private _renderCellShield(cell: WhiteBloodCell) {
    let radThird = cell.radius + (cell.shield.radius - cell.radius) / 3;
    let radTwoThirds =
      cell.radius + (2 * (cell.shield.radius - cell.radius)) / 3;
    this._drawCircle(
      cell.shield.xPos,
      cell.shield.yPos,
      cell.shield.radius,
      this._hex2rgba(
        palette.purple.hex,
        cell.shield.power < 0
          ? 0
          : cell.shield.engaged
          ? cell.shield.isHit()
            ? 0.25
            : 0.1
          : 0.05
      ),
      1
    );
    this._drawRing(
      cell.shield.xPos,
      cell.shield.yPos,
      cell.shield.radius,
      this._hex2rgba(
        cell.shield.power < 0 ? palette.red.hex : palette.pink.hex,
        0.6
      ),
      1
    );
    // this._drawRing(
    //   cell.shield.xPos,
    //   cell.shield.yPos,
    //   radTwoThirds,
    //   this._hex2rgba(
    //     cell.shield.power < 0 ? palette.red.hex : palette.pink.hex,
    //     0.6
    //   ),
    //   1
    // );
    // this._drawRing(
    //   cell.shield.xPos,
    //   cell.shield.yPos,
    //   radThird,
    //   this._hex2rgba(
    //     cell.shield.power < 0 ? palette.red.hex : palette.pink.hex,
    //     0.6
    //   ),
    //   1
    // );
    if (cell.shield.engaged) {
      this._drawRing(
        cell.shield.xPos,
        cell.shield.yPos,
        cell.shield.radius,
        this._hex2rgba(SHIELD_COLORS[cell.shield.color1Index].hex, 0.3),
        3
      );
    }
  }

  private _drawStartCilium(cilium: Cilium): void {
    let ctrlPointLength = Math.floor(cilium.radius / 2);
    this._ctx.beginPath();
    this._ctx.moveTo(Math.floor(cilium.xPos), Math.floor(cilium.yPos));
    this._ctx.bezierCurveTo(
      cilium.xPos + ctrlPointLength, //cp1x
      cilium.yPos - cilium.amplitude, //cp1y
      cilium.xPos + 2 * ctrlPointLength, //cp2x
      cilium.yPos + cilium.amplitude, //cp2y
      cilium.xPos + cilium.radius, //endx
      cilium.yPos + cilium.drift //endy
    );
    this._ctx.lineWidth = 1;
    this._ctx.strokeStyle = this._hex2rgba(cilium.color.hex, 0.7);
    this._ctx.stroke();
  }

  private _drawCilium(cilium: BottomCilium): void {
    let ctrlPointLength = Math.floor(cilium.radius / 2);
    this._ctx.beginPath();
    this._ctx.moveTo(Math.floor(cilium.xPos), Math.floor(cilium.yPos));
    this._ctx.bezierCurveTo(
      cilium.xPos - cilium.amplitude, //cp1x
      cilium.yPos +
        (cilium.location === CiliumLocation.TOP
          ? ctrlPointLength
          : -ctrlPointLength), //cp1y
      cilium.xPos + cilium.amplitude, //cp2x
      cilium.yPos +
        (cilium.location === CiliumLocation.TOP
          ? 2 * ctrlPointLength
          : -2 * ctrlPointLength), //cp2y
      cilium.xPos + cilium.drift, //endx
      cilium.yPos +
        (cilium.location === CiliumLocation.TOP
          ? cilium.radius
          : -cilium.radius) //endy
    );
    this._ctx.lineWidth = cilium.size === CiliumSize.BIG ? 3 : 2;
    this._ctx.strokeStyle = this._hex2rgba(
      cilium.color.hex,
      cilium.size === CiliumSize.BIG ? 0.7 : 0.9
    );
    this._ctx.stroke();
  }

  private _drawTopCilium(cilium: BottomCilium): void {
    let ctrlPointLength = Math.floor(cilium.radius / 2);
    this._ctx.beginPath();
    this._ctx.moveTo(Math.floor(cilium.xPos), Math.floor(cilium.yPos));
    this._ctx.bezierCurveTo(
      cilium.xPos - cilium.amplitude, //cpx
      cilium.yPos + ctrlPointLength, //cp1x
      cilium.xPos + cilium.amplitude, //cp2y
      cilium.yPos + 2 * ctrlPointLength, //cp2
      cilium.xPos + cilium.drift, //endy
      cilium.yPos + cilium.radius //endx
    );
    this._ctx.lineWidth = cilium.color.hex === palette.orange.hex ? 2 : 3;
    this._ctx.strokeStyle = this._hex2rgba(cilium.color.hex, 0.7);
    this._ctx.stroke();
  }

  private _drawBottomCilium(cilium: BottomCilium): void {
    let ctrlPointLength = Math.floor(cilium.radius / 2);
    this._ctx.beginPath();
    this._ctx.moveTo(Math.floor(cilium.xPos), Math.floor(cilium.yPos));
    this._ctx.bezierCurveTo(
      cilium.xPos - cilium.amplitude, //cpx
      cilium.yPos - ctrlPointLength, //cp1x
      cilium.xPos + cilium.amplitude, //cp2y
      cilium.yPos - 2 * ctrlPointLength, //cp2
      cilium.xPos + cilium.drift, //endy
      cilium.yPos - cilium.radius //endx
    );
    this._ctx.lineWidth = cilium.color.hex === palette.orange.hex ? 2 : 3;
    this._ctx.strokeStyle = this._hex2rgba(cilium.color.hex, 0.7);
    this._ctx.stroke();
  }

  private _drawEndCilium(cilium: Cilium): void {
    let ctrlPointLength = Math.floor(cilium.radius / 3);
    this._ctx.beginPath();
    this._ctx.moveTo(Math.floor(cilium.xPos), Math.floor(cilium.yPos));
    this._ctx.bezierCurveTo(
      cilium.xPos - ctrlPointLength, //cp1x
      cilium.yPos - cilium.amplitude, //cp1y
      cilium.xPos - 2 * ctrlPointLength, //cp2x
      cilium.yPos + cilium.amplitude, //cp2y
      cilium.xPos - cilium.radius, //endx
      cilium.yPos + cilium.drift //endy
    );
    this._ctx.lineWidth = 1.5;
    this._ctx.strokeStyle = this._hex2rgba(cilium.color.hex, 0.7);
    this._ctx.stroke();
  }

  private _clearScreen() {
    this._ctx.clearRect(0, 0, this._dims.width, this._dims.height);
  }

  private _renderRedBloodCell(el: PositionableElement) {
    this._drawCircle(
      el.xPos,
      el.yPos,
      el.radius,
      this._hex2rgba(palette.blue.hex, el.alpha)
    );
  }

  private _renderDockingVirusInjection(virus: Virus) {
    this._ctx.beginPath();
    this._ctx.strokeStyle = virus.color.hex;
    this._ctx.lineWidth = 1;
    this._ctx.moveTo(virus.injectionStartX, virus.injectionStartY);
    this._ctx.lineTo(virus.injectionEndX, virus.injectionEndY);
    this._ctx.stroke();
  }

  private _renderVirus(virus: Virus) {
    this._drawCircle(
      virus.xPos,
      virus.yPos,
      virus.radius,
      this._hex2rgba(virus.color.hex, virus.isSeeking() ? 0.75 : virus.alpha)
    );
    this._renderSpikes(virus, virus.docking ? 4 : 4, colorBlack);
    this._drawRing(virus.xPos, virus.yPos, virus.radius, colorBlack.hex, 1);
  }

  private _renderPlasmidSpikes(
    el: PositionableElement,
    spikeLength: number,
    color: CFColor,
    degreeGap = 30
  ) {
    let degree = 0;
    let radius = Virus.PLASMID_RADIUS;
    while (degree < 360) {
      let rad = degree * (Math.PI / 180);
      let spikeXFrom = el.xPos + Math.cos(rad) * radius;
      let spikeYFrom = el.yPos + Math.sin(rad) * radius;
      let spikeXTo = el.xPos + Math.cos(rad) * (radius + spikeLength);
      let spikeYTo = el.yPos + Math.sin(rad) * (radius + spikeLength);
      this._ctx.beginPath();
      this._ctx.moveTo(spikeXFrom, spikeYFrom);
      this._ctx.lineTo(spikeXTo, spikeYTo);
      this._ctx.strokeStyle = color.hex;
      this._ctx.lineWidth = 1;
      this._ctx.stroke();
      degree += degreeGap;
    }
  }

  private _renderSpikes(
    el: PositionableElement,
    spikeLength: number,
    color: CFColor,
    degreeGap = 30
  ) {
    let degree = 0;
    let radius = el.radius;
    while (degree < 360) {
      let rad = degree * (Math.PI / 180);
      let spikeXFrom = el.xPos + Math.cos(rad) * radius;
      let spikeYFrom = el.yPos + Math.sin(rad) * radius;
      let spikeXTo = el.xPos + Math.cos(rad) * (radius + spikeLength);
      let spikeYTo = el.yPos + Math.sin(rad) * (radius + spikeLength);
      this._ctx.beginPath();
      this._ctx.moveTo(spikeXFrom, spikeYFrom);
      this._ctx.lineTo(spikeXTo, spikeYTo);
      this._ctx.strokeStyle = color.hex;
      this._ctx.lineWidth = 1;
      this._ctx.stroke();
      degree += degreeGap;
    }
  }

  private _renderWavySpikes(
    el: MonsterCell,
    spikeLength: number,
    color: CFColor,
    degreeGap = 30
  ) {
    let degree = 0;
    let radius = el.radius;
    while (degree < 360) {
      let rad = degree * (Math.PI / 180);
      let spikeXFrom = el.xPos + Math.cos(rad) * radius;
      let spikeYFrom = el.yPos + Math.sin(rad) * radius;
      let spikeXTo = el.xPos + Math.cos(rad) * (radius + spikeLength);
      let spikeYTo = el.yPos + Math.sin(rad) * (radius + spikeLength);
      this._ctx.beginPath();
      this._ctx.moveTo(spikeXFrom, spikeYFrom);
      this._ctx.lineTo(spikeXTo, spikeYTo);
      this._ctx.strokeStyle = color.hex;
      this._ctx.lineWidth = 1;
      this._ctx.stroke();
      degree += degreeGap;
    }
  }

  private _drawBg(levelProgress: number, scrollVelocity: number) {
    this._ctx.fillStyle = this._hex2rgba(colorWhite.hex, 0.75);
    this._ctx.fillRect(0, 0, this._dims.width, this._dims.height);
    // this._ctx.fillStyle = this._hex2rgba(palette.black.hex, 0);
    this._ctx.fillRect(0, 0, this._dims.width, this._dims.height);
  }

  private _drawCircle(x, y, r, color, anti?) {
    anti = anti ? true : false;
    this._ctx.fillStyle = color;
    this._ctx.beginPath();
    this._ctx.arc(x, y, r, 0, 2 * Math.PI, anti);
    this._ctx.fill();
  }

  private _drawPartialCircle(x, y, r, color, startAngle, endAngle) {
    this._ctx.fillStyle = color;
    this._ctx.beginPath();
    this._ctx.arc(x, y, r, startAngle, endAngle, false);
    this._ctx.fill();
  }

  private _drawRing(
    x,
    y,
    r,
    color,
    lineWidth = 1,
    fromRad = 0,
    toRad = 2 * Math.PI
  ) {
    this._ctx.strokeStyle = color;
    this._ctx.beginPath();
    this._ctx.arc(x, y, r, fromRad, toRad, true);
    this._ctx.lineWidth = lineWidth;
    this._ctx.stroke();
  }

  private _hex2rgba(hex: string, alpha: number) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  public get bgStartShade(): number {
    return this._bgGradientBaseShade;
  }

  public get bgEndShade(): number {
    return this._bgGradientOffsetShade;
  }
}
