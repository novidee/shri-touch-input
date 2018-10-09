const EVENT_HANDLER = {
  pointerdown: 'onPointerDown',
  pointerup: 'onPointerUp',
  pointermove: 'onPointerMove',
  pointercancel: 'onPointerCancel'
};

class PointerController {
  constructor({ node, gestures, onMove }) {
    this.node = node;
    this.pointers = [];
    this.gestures = gestures;
    this.state = {
      x: 0,
      scale: 1,
      angleDistance: 0
    };

    this.onMove = onMove;

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerCancel = this.onPointerCancel.bind(this);

    document.exitPointerLock = document.exitPointerLock
      || document.mozExitPointerLock
      || document.webkitExitPointerLock;

    this.node.requestPointerLock = this.node.requestPointerLock
      || this.node.mozRequestPointerLock
      || this.node.webkitRequestPointerLock;
  }

  isLocked() {
    return this.node === document.pointerLockElement
      || this.node === document.mozPointerLockElement
      || this.node === document.webkitPointerLockElement;
  }

  hasPointerLock() {
    return 'pointerLockElement' in document
      || 'mozPointerLockElement' in document
      || 'webkitPointerLockElement' in document;
  }

  init() {
    this.subscribeEvents();

    this.onMove(this.state);
  }

  subscribeEvents() {
    const { node } = this;

    node.addEventListener('pointerdown', this.onPointerDown);
    node.addEventListener('pointermove', this.onPointerMove);
    node.addEventListener('pointerup', this.onPointerUp);
    node.addEventListener('pointercancel', this.onPointerCancel);
  }

  removePointer(event) {
    this.pointers = this.pointers.filter(pointer => pointer.pointerId !== event.pointerId);
  }

  addPointer(event) {
    this.pointers = this.pointers.concat(event);
  }

  updatePointer(event) {
    this.pointers = this.pointers.map(pointer => pointer.pointerId === event.pointerId
      ? event
      : pointer);
  }

  notify(event) {
    this.gestures.forEach((gesture) => {
      const handler = gesture[EVENT_HANDLER[event.type]];

      if (typeof handler === 'function') handler(event);
    });
  }

  onPointerUp(event) {
    if (!this.hasPointerLock()) this.removePointer(event);

    this.notify(event);
  }

  onPointerCancel(event) {
    if (!this.hasPointerLock()) this.removePointer(event);

    this.notify(event);
  }

  onPointerDown(event) {
    this.addPointer(event);

    if (!this.isLocked()) {
      this.node.requestPointerLock();
    } else {
      document.exitPointerLock();

      if (this.hasPointerLock()) this.removePointer(event);
    }


    this.notify(event, this.state);
  }

  onPointerMove(event) {
    this.updatePointer(event);
    this.performGestures(event);

    this.notify(event);
  }

  performGestures(event) {
    const { gestures, pointers } = this;

    gestures.forEach((gesture) => {
      this.state = gesture.perform(pointers, event, this.state);
    });

    this.onMove(this.state);
  }
}

export default PointerController;
