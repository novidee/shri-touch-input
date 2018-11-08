import { dispatch, getState, subscribe as storeSubscribe } from './store';
import pinchActions from './actions/pinch-actions';
import rotateActions from './actions/rotate-actions';
import dragActions from './actions/drag-actions';
import { getAngle, getDistanceBetweenTwoPoints, getMidpoint, getRightestPointer } from './utils';
import viewActions from './actions/view-actions';
import { changeScaleFactor } from './utils/pinch-utils';
import { getMovement } from './utils/drag-utils';

class Gestures {
  constructor({ onMove }) {
    this.onMove = onMove;
    this.state = getState();

    this.onPointerMove = this.onPointerMove.bind(this);
  }

  init() {
    storeSubscribe(state => {
      this.onMove(state.view);
      this.state = state;
    });
  }

  onPointerUp() {
    dispatch(dragActions.dragStop());
    dispatch(pinchActions.pinchStop());
    dispatch(rotateActions.rotateStop());
  }

  onPointerCancel() {
    dispatch(pinchActions.pinchStop());
    dispatch(rotateActions.rotateStop());
  }

  onPointerDown(event) {
    dispatch(dragActions.dragStart({ x: event.x, y: event.y }));
  }

  onPointerMove(event, pointers) {
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

export default Gestures;
