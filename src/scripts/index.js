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
const PICTURE_WIDTH = 4821;
const PICTURE_HEIGHT = 928;

let brightness = 1;

const updatePreview = ({ x, scale }) => {
  const { clientWidth: documentWidth, offsetHeight: documentHeight } = document.documentElement;
  const squeezeRate = documentHeight / PICTURE_HEIGHT;

  const preview = document.querySelector('.view-info__preview');
  const indicator = document.querySelector('.view-info__indicator');
  const previewWidth = preview.clientWidth;
  const pictureRate = documentWidth / PICTURE_WIDTH / squeezeRate;

  const previewIndicatorWidth = pictureRate / scale * previewWidth;
  const previewCenterOffset = (pictureRate * previewWidth) - (pictureRate * previewWidth / scale);

  const indicatorX = -previewWidth / (PICTURE_WIDTH * squeezeRate) * x
    + previewCenterOffset / 2;

  indicator.style.backgroundImage = `repeating-linear-gradient(to right, transparent, transparent ${previewIndicatorWidth}px, rgba(0,0,0, 0.5) ${previewIndicatorWidth}px, rgba(0,0,0, 0.5) 100%)`;
  indicator.style.backgroundPosition = `${indicatorX}px 100%`;
};

const onMove = (state) => {
  const { x, scale, angleDistance } = state;
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

  // ----
  updatePreview(state);
};

const rotateGesture = new RotateGesture();
const pinchGesture = new PinchGesture();
const dragGesture = new DragGesture();

const pointerController = new PointerController({
  node: view,
  gestures: [dragGesture, pinchGesture, rotateGesture],
  onMove
});

pointerController.init();
