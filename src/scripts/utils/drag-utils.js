const getMovement = (event, gesturePosition) => {
  const { x, y } = event;

  const prevX = gesturePosition.x === 0 ? x : gesturePosition.x;
  const prevY = gesturePosition.y === 0 ? y : gesturePosition.y;

  const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || x - prevX;
  const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || y - prevY;

  return {
    movementX,
    movementY
  };
};

export {
  getMovement
};
