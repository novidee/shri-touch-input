import { createReducer } from 'shri-architecture';

const INITIAL_STATE = {
  x: 0,
  scale: 1,
  angleDistance: 0
};

const handlers = {
  positionChange(state, x) {
    return Object.assign({}, state, {
      x
    });
  },

  scaleChange(state, scale) {
    return Object.assign({}, state, {
      scale
    });
  },

  angleDistanceChange(state, angleDistance) {
    return Object.assign({}, state, {
      angleDistance
    });
  }
};

export default createReducer(handlers, INITIAL_STATE);
