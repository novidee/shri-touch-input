class DragGesture {
  constructor() {
    this.lastPosition = { x: 0, y: 0 };
    this.gesturePosition = { x: 0, y: 0 };
    this.POINTERS_COUNT = 1;

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
  }

  perform(pointers, event, state) {
    const { gesturePosition, lastPosition, POINTERS_COUNT } = this;

    if (pointers.length !== POINTERS_COUNT) return state;

    const { scale = 1 } = state;

    const { x, y } = event;
    const { movementX, movementY } = this.getMovement(event, gesturePosition);
    const dx = movementX / scale;
    const dy = movementY / scale;

    const newX = lastPosition.x + dx;
    const newY = lastPosition.y + dy;

    this.lastPosition = { x: newX, y: newY };
    this.gesturePosition = { x, y };

    return Object.assign({}, state, {
      x: newX,
      y: newY
    });
  }

  getMovement(event, gesturePosition) {
    const { x, y } = event;

    const prevX = gesturePosition.x === 0 ? x : gesturePosition.x;
    const prevY = gesturePosition.y === 0 ? y : gesturePosition.y;

    const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || x - prevX;
    const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || y - prevY;

    return {
      movementX,
      movementY
    };
  }

  onPointerDown(event) {
    this.gesturePosition = { x: event.x, y: event.y };
  }

  onPointerUp() {
    this.gesturePosition = { x: 0, y: 0 };
  }
}

export default DragGesture;
