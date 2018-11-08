import { createStore } from 'shri-architecture';
import reducers from '../reducers';
import combineReducers from '../combine-reducers';

const reducer = combineReducers(reducers);
const { dispatch, getState, subscribe } = createStore(reducer);

export {
  dispatch,
  getState,
  subscribe
};
