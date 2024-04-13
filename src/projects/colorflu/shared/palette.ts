export type CFColor = {
  hex: string;
  powerLvl: number;
};

export type CFPalette = {
  [color: string]: CFColor;
};

export const palette: CFPalette = {
  red: {
    hex: '#e22b2b',
    powerLvl: 1,
  },
  pink: {
    hex: '#f28cb8',
    powerLvl: 2,
  },
  darkBlue: {
    hex: '#254b8a',
    powerLvl: 3,
  },
  orange: {
    hex: '#fca420',
    powerLvl: 4,
  },
  yellow: {
    hex: '#fde02a',
    powerLvl: 5,
  },
  purple: {
    hex: '#390f59',
    powerLvl: 7,
  },
  blue: {
    hex: '#1627cf',
    powerLvl: 8,
  },
  green: {
    hex: '#53a678',
    powerLvl: 9,
  },
  maroon: {
    hex: '#ac2a62',
    powerLvl: 10,
  },
};
