import 'pepjs';
import PinchGesture from './gestures/pinch';
import RotateGesture from './gestures/rotate';
import DragGesture from './gestures/drag';
import PointerController from './pointer-controller';

const view = document.querySelector('.panorama-viewer__image');
view.setAttribute('touch-action', 'none');

const PERCENT_PER_UNIT = 100;
const MIN_BRIGHTNESS = 0;
const MAX_BRIGHTNESS = 2;
const UNFOLDED_ANGLE = 180;

let brightness = 1;

const rotateGesture = new RotateGesture(view);
const pinchGesture = new PinchGesture(view);
const dragGesture = new DragGesture();

const onMove = ({ x, scale, angleDistance }) => {
  document.querySelector('.angle').innerHTML = JSON.stringify({ x, scale });

  view.style.backgroundPosition = `${x}px 100%`;
  view.style.transform = `scale(${scale})`;

  const scaleValueNode = document.querySelector('.view-info__field--scale .view-info__value');
  scaleValueNode.innerHTML = `${Math.round(scale * PERCENT_PER_UNIT)}%`;

// -----------
  let currentBrightness = brightness
    + (angleDistance / UNFOLDED_ANGLE * (MAX_BRIGHTNESS - MIN_BRIGHTNESS));
  currentBrightness = Math.min(MAX_BRIGHTNESS, Math.max(currentBrightness, MIN_BRIGHTNESS));

  brightness = currentBrightness;

  view.style.filter = `brightness(${currentBrightness * PERCENT_PER_UNIT}%)`;

  const brightnessValueNode = document.querySelector('.view-info__field--brightness .view-info__value');
  brightnessValueNode.innerHTML = `${Math.round(currentBrightness * PERCENT_PER_UNIT)}%`;
};

const pointerController = new PointerController({
  node: view,
  gestures: [dragGesture, pinchGesture, rotateGesture],
  onMove
});

pointerController.init();
