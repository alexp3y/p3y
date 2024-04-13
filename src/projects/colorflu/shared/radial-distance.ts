import { PositionableElement } from '../game/positionable-element';

export const radialDistance = (
  p: PositionableElement,
  q: PositionableElement
) => {
  var dx = p.xPos - q.xPos;
  var dy = p.yPos - q.yPos;
  var dist = Math.sqrt(dx * dx + dy * dy);
  return dist;
};
