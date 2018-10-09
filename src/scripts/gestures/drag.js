class DragGesture {
  constructor() {
    this.isActive = false;
    this.lastPosition = { x: 0, y: 0 };
    this.gesturePosition = { x: 0, y: 0 };
    this.startPosition = { x: 0, y: 0 };
    this.POINTERS_COUNT = 1;

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerCancel = this.onPointerCancel.bind(this);
  }

  perform(pointers, event, state) {
    const { isActive, gesturePosition, startPosition, POINTERS_COUNT } = this;

    if (pointers.length !== POINTERS_COUNT) return state;

    const { scale = 1 } = state;
    if (!isActive) return state;

    const { x, y } = event;
    const dx = (x - gesturePosition.x) / scale;
    const dy = (y - gesturePosition.y) / scale;

    const newX = startPosition.x + dx;
    const newY = startPosition.y + dy;

    this.lastPosition = {
      x: newX,
      y: newY
    };

    return Object.assign({}, state, {
      x: newX,
      y: newY
    });
  }

  onPointerDown(event) {
    this.isActive = true;
    this.gesturePosition = { x: event.x, y: event.y };
    this.startPosition = { x: this.lastPosition.x, y: this.lastPosition.y };
  }

  onPointerUp() {
    this.isActive = false;
  }

  onPointerCancel() {
    this.isActive = false;
  }
}

export default DragGesture;
