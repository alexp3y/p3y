import { CFColor, palette } from './palette';

export const posNeg = () => (Math.random() < 0.5 ? -1 : 1);
export const randomVelocity = () => (Math.random() * posNeg()) / 2;
export const randomPosition = (dim) => Math.random() * dim;
export const randomBetween = (start, end) =>
  Math.random() * (end - start) + start;
export const randomColor = (): CFColor => {
  let keys = Object.keys(palette);
  return palette[keys[Math.floor(Math.random() * keys.length)]];
};
