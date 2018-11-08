import { dispatch, getState, subscribe as storeSubscribe } from './store';
import dragActions from './actions/drag-actions';
import pinchActions from './actions/pinch-actions';
import rotateActions from './actions/rotate-actions';
import viewActions from './actions/view-actions';
import { getMovement } from './utils/drag-utils';
import { changeScaleFactor } from './utils/pinch-utils';
import { getAngle, getDistanceBetweenTwoPoints, getMidpoint, getRightestPointer } from './utils';

const EVENT_HANDLER = {
  pointerdown: 'onPointerDown',
  pointerup: 'onPointerUp',
  pointermove: 'onPointerMove',
  pointercancel: 'onPointerCancel'
};

class PointerController {
  constructor({ node, onMove }) {
    this.node = node;
    this.pointers = [];
    this.state = getState();

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

    storeSubscribe(state => {
      this.onMove(state.view);
      this.state = state;
    });
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

    dispatch(dragActions.dragStop());
    dispatch(pinchActions.pinchStop());
    dispatch(rotateActions.rotateStop());
  }

  onPointerCancel(event) {
    if (!this.hasPointerLock()) this.removePointer(event);

    this.notify(event);

    dispatch(pinchActions.pinchStop());
    dispatch(rotateActions.rotateStop());
  }

  onPointerDown(event) {
    this.addPointer(event);

    if (!this.isLocked()) {
      this.node.requestPointerLock();
    } else {
      document.exitPointerLock();

      if (this.hasPointerLock()) this.removePointer(event);
    }

    this.notify(event, this.state.view);

    dispatch(dragActions.dragStart({ x: event.x, y: event.y }));
  }

  onPointerMove(event) {
    this.updatePointer(event);
    this.performGestures(event);

    this.notify(event);
  }

  performGestures(event) {
    const { pointers } = this;

    if (pointers.length === 2) {
      const MIN_DIFF = 20;
      const MAX_SCALE = 4;
      const MIN_SCALE = 1;
      const { prevDiff, currentScale } = this.state.pinch;

      const [firstPointer, secondPointer] = pointers;
      const currentDiff = Math.abs(getDistanceBetweenTwoPoints(
        firstPointer.clientX,
        secondPointer.clientX,
        firstPointer.clientY,
        secondPointer.clientY
      ));

      let newScale = currentScale;
      if (prevDiff > 0 && Math.abs(currentDiff - prevDiff) < MIN_DIFF) {
        newScale = changeScaleFactor(newScale, currentDiff / prevDiff, MAX_SCALE, MIN_SCALE);
      }

      dispatch(pinchActions.pinch({ scale: newScale, diff: currentDiff }));
      dispatch(viewActions.scaleChange(newScale));

      // ---- -- - - -- - -- - - - -- -- -

      const UNFOLDED_ANGLE = 180;
      const RIGHT_ANGLE = 90;
      const { prevAngle } = this.state.rotate;

      const currentCenter = getMidpoint(
        pointers[0].clientX,
        pointers[1].clientX,
        pointers[0].clientY,
        pointers[1].clientY
      );
      const rightestPointer = getRightestPointer(pointers);

      const currentAngle = getAngle(
        currentCenter.x,
        currentCenter.y,
        rightestPointer.x,
        rightestPointer.y
      );

      if (prevAngle === 0) {
        dispatch(rotateActions.rotate(currentAngle));
        return;
      }

      let distance = prevAngle - currentAngle;

      if (distance > RIGHT_ANGLE) distance -= UNFOLDED_ANGLE;
      else if (distance < -RIGHT_ANGLE) distance += UNFOLDED_ANGLE;

      dispatch(rotateActions.rotate(currentAngle));
      dispatch(viewActions.angleDistanceChange(distance));
    }

    if (pointers.length === 1) {
      const newPosition = getNewPosition(this.state, event);

      dispatch(dragActions.drag({ newPosition, event }));
      dispatch(viewActions.positionChange(newPosition.x));
    }
  }
}

function getNewPosition(state, event) {
  const { gesturePosition, lastPosition } = state.drag;
  const { scale } = state.view;

  const { movementX, movementY } = getMovement(event, gesturePosition);
  const dx = movementX / scale;
  const dy = movementY / scale;

  return { x: lastPosition.x + dx, y: lastPosition.y + dy };
}

export default PointerController;