import { ColorfluGame } from './game';
import { Cilium } from './game/cilium';
import { ExplodableElement } from './game/explodable-element';
import { PositionableElement } from './game/positionable-element';
import { Virus } from './game/virus';
import { WhiteBloodCell } from './game/white-blood-cell';
import { colorWhite, palette } from './shared/palette';
import { NAVBAR_HEIGHT, WindowDimensions } from './shared/window-dimensions';
import { ColorfluSplashScreen } from './splash-screen';

export class ColorfluGraphics {
  private static BG_GRADIENT_OFFSET = 0;

  private _ctx: CanvasRenderingContext2D;
  private _bgGradientBaseShade = 255;
  private _bgGradientOffsetShade = 255 - ColorfluGraphics.BG_GRADIENT_OFFSET;

  constructor(
    private _canvas: HTMLCanvasElement,
    private _dimensions: WindowDimensions
  ) {
    this._canvas.setAttribute(
      'height',
      `${this._dimensions.height - NAVBAR_HEIGHT}`
    );
    this._canvas.setAttribute('width', `${this._dimensions.width}`);
    this._ctx = this._canvas.getContext('2d')!;
  }

  public resizeWindow(dim: WindowDimensions) {
    this._dimensions = dim;
    this._canvas.setAttribute(
      'height',
      `${this._dimensions.height - NAVBAR_HEIGHT}`
    );
    this._canvas.setAttribute('width', `${this._dimensions.width}`);
  }

  public renderSplashScreen(splashScreen: ColorfluSplashScreen) {
    this._ctx.fillStyle = this._hex2rgba(palette.red.hex, 1);
    this._ctx.fillRect(0, 0, this._dimensions.width, this._dimensions.height);
    this._ctx.fillStyle = this._hex2rgba(colorWhite.hex, 0.95);
    this._ctx.fillRect(0, 0, this._dimensions.width, this._dimensions.height);
    splashScreen.redBloodCells.forEach((v, i) => this._renderRedBloodCell(v));
    this._drawCircle(
      50,
      this._dimensions.height,
      this._dimensions.height / 2,
      this._hex2rgba(palette.pink.hex, 0.25)
    );
    this._drawRing(
      50,
      this._dimensions.height,
      this._dimensions.height / 2,
      palette.pink.hex,
      2
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
      .filter((v) => !v.isDestroyed() && !v.infected)
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
  }

  private _renderExplodedElement(el: ExplodableElement) {
    let radIncrement = (2 * Math.PI) / ExplodableElement.FRAGMENT_SIZE;
    let fragmentStartRad = 0;
    let fragmentEndRad = radIncrement;
    if (el.timeRemaining > ExplodableElement.EXPLOSION_DURATION / 2) {
      this._drawRing(
        el.xPos,
        el.yPos,
        el.radius,
        this._hex2rgba(
          el.explosionColor.hex,
          1 - (1 - el.timeRemaining / ExplodableElement.EXPLOSION_DURATION)
        )
      );
      this._drawCircle(
        el.xPos,
        el.yPos,
        el.radius,
        this._hex2rgba(
          el.explosionColor.hex,
          1 - (1 - el.timeRemaining / 2 / ExplodableElement.EXPLOSION_DURATION)
        )
      );
    }
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
    this._drawCircle(
      cell.xPos,
      cell.yPos,
      Math.ceil(cell.radius / 2),
      this._hex2rgba(cell.color.hex, 0.7)
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
          this._hex2rgba('#000000', 0.8),
          1,
          dockPoint + 0.3,
          dockPoint - 0.3
        );
        this._drawRing(
          v.plasmidXPos,
          v.plasmidYPos,
          Virus.PLASMID_RADIUS,
          '#000000',
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
        this._drawRing(v.xPos, v.yPos, Virus.PLASMID_RADIUS, '#000000', 1);
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
    this._drawCircle(
      cell.shield.xPos,
      cell.shield.yPos,
      cell.shield.radius,
      this._hex2rgba(palette.yellow.hex, 0.25),
      1
    );
    if (cell.shield.active) {
      this._drawRing(
        cell.shield.xPos,
        cell.shield.yPos,
        cell.shield.radius,
        this._hex2rgba(cell.shield.color3.hex, 0.99),
        2,
        cell.shield.startAngle,
        cell.shield.endAngle -
          (cell.shield.endAngle - cell.shield.startAngle / 2)
      );
      this._drawRing(
        cell.shield.xPos,
        cell.shield.yPos,
        cell.radius + (2 * (cell.shield.radius - cell.radius)) / 3,
        this._hex2rgba(cell.shield.color2.hex, 0.99),
        2,
        cell.shield.startAngle,
        cell.shield.endAngle
      );
      this._drawRing(
        cell.shield.xPos,
        cell.shield.yPos,
        cell.radius + (cell.shield.radius - cell.radius) / 3,
        this._hex2rgba(cell.shield.color.hex, 0.99),
        2,
        cell.shield.startAngle,
        cell.shield.endAngle
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
    this._ctx.clearRect(0, 0, this._dimensions.width, this._dimensions.height);
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
    // if (scrollVelocity != 0) {
    //   // update gradient: 255 -> 0 (white -> black)
    //   this._bgGradientBaseShade =
    //     Math.floor(255 * (1 - levelProgress / LEVEL_LENGTH)) -
    //     ColorfluGraphics.BG_GRADIENT_OFFSET;
    //   this._bgGradientOffsetShade =
    //     this._bgGradientBaseShade - ColorfluGraphics.BG_GRADIENT_OFFSET;
    // }
    // // draw gradient
    // let gradient = this._ctx.createLinearGradient(0, 0, LEVEL_LENGTH, 0);
    // gradient.addColorStop(
    //   0,
    //   this._makeColorFromShade(this._bgGradientBaseShade)
    // );
    // gradient.addColorStop(
    //   1,
    //   this._makeColorFromShade(this._bgGradientOffsetShade)
    // );
    // this._ctx.fillStyle = gradient;
    this._ctx.fillStyle = this._hex2rgba(palette.red.hex, 1);
    this._ctx.fillRect(0, 0, this._dimensions.width, this._dimensions.height);
    this._ctx.fillStyle = this._hex2rgba(colorWhite.hex, 0.95);
    this._ctx.fillRect(0, 0, this._dimensions.width, this._dimensions.height);
  }

  private _makeColorFromShade(shade) {
    return `rgb(${shade}, ${shade}, ${shade})`;
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
