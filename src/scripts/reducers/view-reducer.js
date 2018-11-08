import { createReducer } from 'shri-architecture';

const INITIAL_STATE = {
  x: 0,
  scale: 1,
  angleDistance: 0
};

const handlers = {
  positionChange(state, x) {
    return {
      ...state,
      x
    };
  },

  scaleChange(state, scale) {
    return {
      ...state,
      scale
    };
  },

  angleDistanceChange(state, angleDistance) {
    return {
      ...state,
      angleDistance
    };
  }
};

export default createReducer(handlers, INITIAL_STATE);
