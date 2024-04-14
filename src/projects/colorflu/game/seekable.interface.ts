import { PositionableElement } from './positionable-element';

export interface Seekable {
  isInRange(target: PositionableElement): boolean;
  seek(target: PositionableElement): void;
}
