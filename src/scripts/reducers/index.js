import dragReducer from './drag-reducer';
import pinchReducer from './pinch-reducer';
import rotateReducer from './rotate-reducer';
import viewReducer from './view-reducer';

const reducers = {
  drag: dragReducer,
  // pinch: pinchReducer,
  // rotate: rotateReducer,
  view: viewReducer
};

export default reducers;
