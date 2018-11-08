import { createReducer } from 'shri-architecture';

const INITIAL_STATE = {
  x: 0,
  scale: 1,
  angleDistance: 0
};

const handlers = {
  fieldChange(state, { field, value }) {
    return {
      ...state,
      [field]: value
    };
  }
};

export default createReducer(handlers, INITIAL_STATE);
