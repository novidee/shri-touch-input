import { dispatch, getState, subscribe as storeSubscribe } from './store';
import pointerActions from './actions/pointer-actions';

class PointerController {
  constructor({ node, events }) {
    this.node = node;
    this.pointers = getState().pointers;
    this.events = events;

    this.removePointer = event => dispatch(pointerActions.pointerRemove(event.pointerId));
    this.addPointer = event => dispatch(pointerActions.pointerAdd(event));
    this.updatePointer = event => dispatch(pointerActions.pointerUpdate(event));
    this.hasPointerLock = () => 'pointerLockElement' in document
      || 'mozPointerLockElement' in document
      || 'webkitPointerLockElement' in document;

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

  init() {
    this.subscribeEvents();

    storeSubscribe((state) => { this.pointers = state.pointers; });
  }

  subscribeEvents() {
    const { node } = this;

    node.addEventListener('pointerdown', this.onPointerDown);
    node.addEventListener('pointermove', this.onPointerMove);
    node.addEventListener('pointerup', this.onPointerUp);
    node.addEventListener('pointercancel', this.onPointerCancel);
  }

  onPointerUp(event) {
    if (!this.hasPointerLock()) this.removePointer(event);

    this.events.onPointerUp(event, this.pointers);
  }

  onPointerCancel(event) {
    if (!this.hasPointerLock()) this.removePointer(event);

    this.events.onPointerCancel(event, this.pointers);
  }

  onPointerDown(event) {
    this.addPointer(event);

    if (!this.isLocked()) {
      this.node.requestPointerLock();
    } else {
      document.exitPointerLock();

      if (this.hasPointerLock()) this.removePointer(event);
    }

    this.events.onPointerDown(event, this.pointers);
  }

  onPointerMove(event) {
    this.updatePointer(event);

    this.events.onPointerMove(event, this.pointers);
  }
}


export default PointerController;
