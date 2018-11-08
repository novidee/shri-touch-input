import { createReducer } from 'shri-architecture';

const INITIAL_STATE = {
  x: 0,
  scale: 1,
  angleDistance: 0
};

const handlers = {
  positionChange(state, newX) {
    return Object.assign({}, state, {
      x: newX
    });
  }
};

export default createReducer(handlers, INITIAL_STATE);
