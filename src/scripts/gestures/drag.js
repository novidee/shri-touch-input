class DragGesture {
  constructor(node) {
    this.node = node;
    this.isActive = false;
    this.lastPosition = { x: 0, y: 0 };
    this.gesturePosition = { x: 0, y: 0 };
    this.startPosition = { x: 0, y: 0 };

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerCancel = this.onPointerCancel.bind(this);
  }

  perform(pointers, event, state) {
    if (pointers.length !== 1) return;

    const { isActive, gesturePosition, startPosition } = this;
    const { scale = 1 } = state;
    if (!isActive) return;

    const { x, y } = event;
    const dx = (x - gesturePosition.x) / scale;
    const dy = (y - gesturePosition.y) / scale;

    const maxDelta = (document.documentElement.clientHeight - document.documentElement.clientHeight / scale) / 2;

    // if (Math.abs(startPosition.y + dy) > maxDelta) return;

    const r = Math.abs(startPosition.y + dy) > maxDelta ? maxDelta : startPosition.y + dy;

    this.node.style.backgroundPosition = `${startPosition.x + dx}px ${r}`;
    // this.node.style.backgroundPositionY = `${(startPosition.y + dy)}px`;

    const ddd = document.querySelector('.angle');
    // ddd.innerHTML = maxDelta;

    this.lastPosition = {
      x: startPosition.x + dx,
      y: startPosition.y + dy
    };
  }

  onPointerDown(event, state) {
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
