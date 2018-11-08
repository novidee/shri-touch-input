import { createStore, combineReducers } from 'shri-architecture';
import reducers from '../reducers';

const reducer = combineReducers(reducers);
const { dispatch, getState, subscribe } = createStore(reducer);

export {
  dispatch,
  getState,
  subscribe
};
