import { createReducer } from 'shri-architecture';
import { getMovement } from '../utils/drag-utils';

const INITIAL_STATE = {
  lastPosition: { x: 0, y: 0 },
  gesturePosition: { x: 0, y: 0 }
};

const POINTERS_COUNT = 1;

const handlers = {
  dragStart(state, { x, y }) {
    return Object.assign({}, state, {
      gesturePosition: { x, y }
    });
  },

  dragStop(state) {
    return Object.assign({}, state, {
      gesturePosition: INITIAL_STATE.gesturePosition
    });
  },

  drag(state, { newPosition, event }) {
    const { x, y } = event;

    return {
      lastPosition: { x: newPosition.x, y: newPosition.y },
      gesturePosition: { x, y }
    };
  }
};

export default createReducer(handlers, INITIAL_STATE);
