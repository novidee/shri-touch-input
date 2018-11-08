import { createReducer } from 'shri-architecture';

const INITIAL_STATE = [];

const handlers = {
  pointerAdd(state, pointer) {
    return state.concat(pointer);
  },

  pointerRemove(state, pointerId) {
    return state.filter(pointer => pointer.pointerId !== pointerId);
  },

  pointerUpdate(state, pointer) {
    return state.map(p => p.pointerId === pointer.pointerId ? pointer : p);
  }
};

export default createReducer(handlers, INITIAL_STATE);
