const MIN_DIFF = 20;
const MAX_SCALE = 4;
const MIN_SCALE = 1;

function getDistanceBetweenTwoPoints(x0, x1, y0, y1) {
  return Math.hypot(x1 - x0, y1 - y0);
}

function changeScaleFactor(currentScale, scale, maxScale, minScale) {
  const newScale = currentScale * scale;

  return Math.min(maxScale, Math.max(newScale, minScale));
}

function calculateDiff(pointers) {
  const [firstPointer, secondPointer] = pointers;

  return Math.abs(getDistanceBetweenTwoPoints(
    firstPointer.clientX,
    secondPointer.clientX,
    firstPointer.clientY,
    secondPointer.clientY
  ));
}

function calculateScale({ pinchInfo, currentDiff }) {
  const { currentScale, prevDiff } = pinchInfo;

  if (prevDiff > 0 && Math.abs(currentDiff - prevDiff) < MIN_DIFF) {
    return changeScaleFactor(currentScale, currentDiff / prevDiff, MAX_SCALE, MIN_SCALE);
  }

  return currentScale;
}

export {
  calculateDiff,
  calculateScale,
  changeScaleFactor
};
