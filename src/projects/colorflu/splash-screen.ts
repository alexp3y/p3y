import { RedBloodCell } from './game/red-blood-cell';
import { WindowDimensions } from './shared/window-dimensions';

export class ColorfluSplashScreen {
  private _redBloodCells: RedBloodCell[] = [];

  constructor(private _dimensions: WindowDimensions) {
    let x = 0;
    while (x < 50) {
      x++;
      this._redBloodCells.push(
        new RedBloodCell(this._dimensions, this._dimensions.width)
      );
    }
  }

  update(clock: number) {
    //
    this._redBloodCells.forEach((c) => c.update(this._dimensions));
  }

  public get redBloodCells(): RedBloodCell[] {
    return this._redBloodCells;
  }
}
