import dragReducer from './drag-reducer';
import pinchReducer from './pinch-reducer';
import rotateReducer from './rotate-reducer';
import viewReducer from './view-reducer';
import pointersReducer from './pointers-reducer';

const reducers = {
  drag: dragReducer,
  pinch: pinchReducer,
  rotate: rotateReducer,
  view: viewReducer,
  pointers: pointersReducer
};

export default reducers;
