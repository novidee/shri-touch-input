function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs = null;
  let savedThis = null;

  function wrapper(...args) {
    if (isThrottled) {
      savedArgs = args;
      savedThis = this;
      return;
    }

    func.apply(this, args);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;

      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = null;
        savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

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
