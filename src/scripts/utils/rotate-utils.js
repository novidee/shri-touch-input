const UNFOLDED_ANGLE = 180;
const RIGHT_ANGLE = 90;

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

function calculateAngle({ pointers }) {
  const currentCenter = getMidpoint(
    pointers[0].clientX,
    pointers[1].clientX,
    pointers[0].clientY,
    pointers[1].clientY
  );
  const rightestPointer = getRightestPointer(pointers);

  return getAngle(
    currentCenter.x,
    currentCenter.y,
    rightestPointer.x,
    rightestPointer.y
  );
}

function calculateDistance({ prevAngle, angle }) {
  let distance = prevAngle - angle;

  if (distance > RIGHT_ANGLE) distance -= UNFOLDED_ANGLE;
  else if (distance < -RIGHT_ANGLE) distance += UNFOLDED_ANGLE;

  return distance;
}

export {
  calculateAngle,
  calculateDistance
};
