import { ColorfluGame } from './game';

export class ColorfluSavedGame {
  private _data: string;
  private _saveDate: Date;

  constructor(game: ColorfluGame) {
    this._data = JSON.stringify(game);
    this._saveDate = new Date();
  }

  restore(): ColorfluGame {
    return JSON.parse(this._data);
  }

  public get saveDate(): Date {
    return this._saveDate;
  }
}
