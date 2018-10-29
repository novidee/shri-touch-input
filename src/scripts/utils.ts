import { Point } from './abstractions/types';

function getDistanceBetweenTwoPoints(x0: number, x1: number, y0: number, y1: number) {
  return Math.hypot(x1 - x0, y1 - y0);
}

function getAngle(x0: number, y0: number, x1: number, y1: number) {
  return Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI;
}

function getMidpoint(x0: number, x1: number, y0: number, y1: number) {
  return {
    x: ((x0 + x1) / 2),
    y: ((y0 + y1) / 2),
  };
}

function getRightestPointer(pointers: Point[]) {
  return pointers.sort((a, b) => b.x - a.x)[0];
}

export {
  getDistanceBetweenTwoPoints,
  getAngle,
  getMidpoint,
  getRightestPointer,
};
