import { createReducer } from 'shri-architecture';

const INITIAL_STATE = {
  prevAngle: 0
};

const handlers = {
  rotateStop(state) {
    return Object.assign({}, state, {
      prevAngle: INITIAL_STATE.prevAngle
    });
  },

  rotate(state, angle) {
    return Object.assign({}, state, {
      prevAngle: angle
    });
  }
};

export default createReducer(handlers, INITIAL_STATE);
