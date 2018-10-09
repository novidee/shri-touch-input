function getDistanceBetweenTwoPoints(x0, x1, y0, y1) {
  return Math.hypot(x1 - x0, y1 - y0);
}

function getAngle(x0, y0, x1, y1) {
  return Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI;
}

function getMidpoint(x0, x1, y0, y1) {
  return {
    x: ((x0 + x1) / 2),
    y: ((y0 + y1) / 2)
  };
}

function getRightestPointer(pointers) {
  return pointers.sort((a, b) => b.x - a.x)[0];
}

export {
  getDistanceBetweenTwoPoints,
  getAngle,
  getMidpoint,
  getRightestPointer
};
