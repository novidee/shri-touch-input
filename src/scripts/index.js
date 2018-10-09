import 'pepjs';
import PinchGesture from './gestures/pinch';
import RotateGesture from './gestures/rotate';
import DragGesture from './gestures/drag';
import PointerController from './pointer-controller';

const view = document.querySelector('.panorama-viewer__image');
view.setAttribute('touch-action', 'none');

const rotateGesture = new RotateGesture(view);
const pinchGesture = new PinchGesture(view);
const dragGesture = new DragGesture(view);

const onMove = (data) => {
  document.querySelector('.angle').innerHTML = JSON.stringify(data);
  console.log('ddddd', data);
};

const pointerController = new PointerController({
  node: view,
  gestures: [dragGesture, pinchGesture, rotateGesture],
  onMove
});

pointerController.init();
