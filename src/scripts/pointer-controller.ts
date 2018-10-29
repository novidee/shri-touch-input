import { EventHandler } from './abstractions/enums';
import { PointersState } from './abstractions/types';

class PointerController {
  private node: Element;
  private pointers: PointerEvent[];
  private gestures: any;
  private state: PointersState;
  private onMove: (state: PointersState) => void;

  constructor({ node, gestures, onMove }: { node: Element, gestures: [], onMove: () => ({}) }) {
    this.node = node;
    this.pointers = [];
    this.gestures = gestures;
    this.state = {
      x: 0,
      scale: 1,
      angleDistance: 0,
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

  removePointer(event: PointerEvent) {
    this.pointers = this.pointers.filter(pointer => pointer.pointerId !== event.pointerId);
  }

  addPointer(event: PointerEvent) {
    this.pointers = this.pointers.concat(event);
  }

  updatePointer(event: PointerEvent) {
    this.pointers = this.pointers.map(pointer => pointer.pointerId === event.pointerId
      ? event
      : pointer);
  }

  notify(event: PointerEvent) {
    this.gestures.forEach((gesture) => {
      const handler = gesture[EventHandler[event.type]];

      if (typeof handler === 'function') handler(event);
    });
  }

  onPointerUp(event: Event) {
    const pointerEvent = <PointerEvent>event;
    if (!this.hasPointerLock()) this.removePointer(pointerEvent);

    this.notify(<PointerEvent>event);
  }

  onPointerCancel(event: Event) {
    const pointerEvent = <PointerEvent>event;
    if (!this.hasPointerLock()) this.removePointer(pointerEvent);

    this.notify(pointerEvent);
  }

  onPointerDown(event: Event) {
    const pointerEvent = <PointerEvent>event;
    this.addPointer(pointerEvent);

    if (!this.isLocked()) {
      this.node.requestPointerLock();
    } else {
      document.exitPointerLock();

      if (this.hasPointerLock()) this.removePointer(pointerEvent);
    }

    this.notify(pointerEvent);
  }

  onPointerMove(event: Event) {
    const pointerEvent = <PointerEvent>event;

    this.updatePointer(pointerEvent);
    this.performGestures(pointerEvent);

    this.notify(pointerEvent);
  }

  performGestures(event: PointerEvent) {
    const { gestures, pointers } = this;

    gestures.forEach((gesture) => {
      this.state = gesture.perform(pointers, event, this.state);
    });

    this.onMove(this.state);
  }
}

export default PointerController;
