import { createReducer } from 'shri-architecture';

const INITIAL_STATE = {
  prevDiff: -1,
  currentScale: 1
};

const handlers = {
  pinchStop(state) {
    return Object.assign({}, state, {
      prevDiff: INITIAL_STATE.prevDiff
    });
  },

  pinch(state, { diff, scale }) {
    return Object.assign({}, state, {
      prevDiff: diff,
      currentScale: scale
    });
  }
};

export default createReducer(handlers, INITIAL_STATE);
