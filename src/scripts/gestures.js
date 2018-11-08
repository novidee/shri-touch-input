import { dispatch, getState, subscribe as storeSubscribe } from './store';
import pinchActions from './actions/pinch-actions';
import rotateActions from './actions/rotate-actions';
import dragActions from './actions/drag-actions';
import viewActions from './actions/view-actions';
import { calculateDiff, calculateScale } from './utils/pinch-utils';
import { getNewPosition } from './utils/drag-utils';
import { calculateAngle, calculateDistance } from './utils/rotate-utils';

class Gestures {
  constructor({ onMove }) {
    this.onMove = onMove;
    this.state = getState();

    this.onPointerMove = this.onPointerMove.bind(this);
  }

  init() {
    storeSubscribe((state) => {
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
    const { pinch: pinchInfo, rotate: rotateInfo, drag: dragInfo, view: viewInfo } = this.state;

    if (pointers.length === 2) {
      const currentDiff = calculateDiff(pointers);
      const newScale = calculateScale({ pinchInfo, currentDiff });

      dispatch(pinchActions.pinch({ scale: newScale, diff: currentDiff }));
      dispatch(viewActions.fieldChange({ field: 'scale', value: newScale }));


      const { prevAngle } = rotateInfo;
      const angle = calculateAngle({ pointers });

      if (prevAngle === 0) {
        dispatch(rotateActions.rotate(angle));
        return;
      }

      const distance = calculateDistance({ prevAngle, angle });

      dispatch(rotateActions.rotate(angle));
      dispatch(viewActions.fieldChange({ field: 'angleDistance', value: distance }));
    }

    if (pointers.length === 1) {
      const newPosition = getNewPosition({
        scale: viewInfo.scale,
        dragInfo,
        event
      });

      dispatch(dragActions.drag({ newPosition, event }));
      dispatch(viewActions.fieldChange({ field: 'x', value: newPosition.x }));
    }
  }
}

export default Gestures;
