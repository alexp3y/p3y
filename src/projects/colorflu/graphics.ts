import { ColorfluGame } from './game';
import { SHIELD_COLORS } from './game/cell-shield';
import { Cilium } from './game/cilium';
import { ExplodableElement } from './game/explodable-element';
import { PositionableElement } from './game/positionable-element';
import { Virus } from './game/virus';
import { WhiteBloodCell } from './game/white-blood-cell';
import { CFColor, colorBlack, colorWhite, palette } from './shared/palette';
import { NAVBAR_HEIGHT, WindowDimensions } from './shared/window-dimensions';
import { ColorfluSplashScreen } from './splash-screen';

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
    this._renderCellShield(game.cell);
    game.viruses
      .filter((v) => v.isExploded)
      .forEach((v) => this._renderExplodedElement(v));
    game.viruses
      .filter((v) => !v.isExploded() && !v.infected)
      .forEach((v, i) => this._renderVirus(v));
    game.startCilia.forEach((c, i) => {
      if (!(i % 2)) this._drawStartCilium(c);
    });
    game.endCilia.forEach((c, i) => {
      if (!(i % 2)) this._drawEndCilium(c);
    });
    // white blood cell
    this._renderWhiteBloodCell(game.cell);
    game.startCilia.forEach((c, i) => {
      if (i % 2) this._drawStartCilium(c);
    });
    game.endCilia.forEach((c, i) => {
      if (i % 2) this._drawEndCilium(c);
    });
    if (game.cell.shield.power > 0) {
      this._roundedRect(
        85,
        25 + 100 - game.cell.shield.power,
        35,
        game.cell.shield.power,
        game.cell.shield.power < 95
          ? game.cell.shield.power < 10
            ? Math.PI
            : 1.5 * Math.PI
          : 3 * Math.PI,
        palette.pink,
        true
      );
      this._roundedRect(85, 25, 35, 100, 3 * Math.PI, colorBlack);
    } else {
      this._roundedRect(85, 25, 35, 100, 3 * Math.PI, palette.red, true);
      this._roundedRect(85, 25, 35, 100, 3 * Math.PI, palette.red);
    }
    this._ctx.fillStyle = colorBlack.hex;
    this._ctx.font = '15px anta';
    this._ctx.fillText('SHIELD', 77, 145);
  }

  private _roundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    color: CFColor,
    fill?
  ) {
    this._ctx.beginPath();
    this._ctx.moveTo(x, y + radius);
    this._ctx.arcTo(x, y + height, x + radius, y + height, radius);
    this._ctx.arcTo(
      x + width,
      y + height,
      x + width,
      y + height - radius,
      radius
    );
    this._ctx.arcTo(x + width, y, x + width - radius, y, radius);
    this._ctx.arcTo(x, y, x, y + radius, radius);
    this._ctx.lineWidth = 2;
    if (fill) {
      this._ctx.fillStyle = this._hex2rgba(color.hex, 0.35);
      this._ctx.fill();
    } else {
      this._ctx.strokeStyle = color.hex;
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
        f.color.hex,
        1,
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
      });
    cell.gun.bullets
      .filter((b) => !b.isDestroyed())
      .forEach((b) => {
        this._drawCircle(
          b.xPos,
          b.yPos,
          b.radius,
          this._hex2rgba(b.color.hex, 1.0),
          1
        );
        this._drawRing(
          b.xPos,
          b.yPos,
          b.radius,
          this._hex2rgba('#000000', 0.5),
          1
        );
      });
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
        0.4
      ),
      1
    );
    this._drawRing(
      cell.shield.xPos,
      cell.shield.yPos,
      radTwoThirds,
      this._hex2rgba(
        cell.shield.power < 0 ? palette.red.hex : palette.pink.hex,
        0.4
      ),
      1
    );
    this._drawRing(
      cell.shield.xPos,
      cell.shield.yPos,
      radThird,
      this._hex2rgba(
        cell.shield.power < 0 ? palette.red.hex : palette.pink.hex,
        0.4
      ),
      1
    );
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
    let ctrlPointLength = Math.floor(cilium.radius / 3);
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
    this._ctx.lineWidth = 1.5;
    this._ctx.strokeStyle = cilium.color.hex;
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
    this._ctx.strokeStyle = cilium.color.hex;
    this._ctx.stroke();
  }

  private _clearScreen() {
    this._ctx.clearRect(0, 0, this._dims.width, this._dims.height);
  }

  private _renderRedBloodCell(el: PositionableElement) {
    if (el.radius < 300) {
      this._drawCircle(
        el.xPos,
        el.yPos,
        el.radius,
        this._hex2rgba(el.color.hex, el.alpha)
      );
    } else {
      this._drawRing(
        el.xPos,
        el.yPos,
        el.radius,
        this._hex2rgba(el.color.hex, 1)
      );
    }
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
    let degree = 0;
    while (degree < 360) {
      let rad = degree * (Math.PI / 180);
      let spikeXFrom = virus.xPos + Math.cos(rad) * virus.radius;
      let spikeYFrom = virus.yPos + Math.sin(rad) * virus.radius;
      let spikeXTo = virus.xPos + Math.cos(rad) * (virus.radius + 4);
      let spikeYTo = virus.yPos + Math.sin(rad) * (virus.radius + 4);
      this._ctx.beginPath();
      this._ctx.moveTo(spikeXFrom, spikeYFrom);
      this._ctx.lineTo(spikeXTo, spikeYTo);
      this._ctx.strokeStyle = virus.color.hex;
      this._ctx.stroke();
      degree += 30;
    }
    this._drawRing(virus.xPos, virus.yPos, virus.radius, '#000000', 1);
  }

  private _drawBg(levelProgress: number, scrollVelocity: number) {
    this._ctx.fillStyle = this._hex2rgba(palette.red.hex, 1);
    this._ctx.fillRect(0, 0, this._dims.width, this._dims.height);
    this._ctx.fillStyle = this._hex2rgba(colorWhite.hex, 0.95);
    this._ctx.fillRect(0, 0, this._dims.width, this._dims.height);
  }

  private _drawCircle(x, y, r, color, anti?) {
    anti = anti ? true : false;
    this._ctx.fillStyle = color;
    this._ctx.beginPath();
    this._ctx.arc(x, y, r, 0, 2 * Math.PI, anti);
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
