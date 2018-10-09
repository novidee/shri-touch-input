import 'pepjs';
import PinchGesture from './gestures/pinch';
import RotateGesture from './gestures/rotate';
import DragGesture from './gestures/drag';
import PointerController from './pointer-controller';
import { updateIndicators } from './indicators';

const view = document.querySelector('.panorama-viewer__image');
view.setAttribute('touch-action', 'none');

const PERCENT_PER_UNIT = 100;
const UNFOLDED_ANGLE = 180;
const MIN_BRIGHTNESS = 0;
const MAX_BRIGHTNESS = 2;

let brightness = 1;
let image = null;

const downloadImage = () => (
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = 'images/panorama.jpg';

    img.onload = () => resolve(img);
    img.onerror = reject;
  })
);

const updateImage = (state) => {
  const { x, scale, angleDistance } = state;

  let currentBrightness = brightness
    + (-angleDistance / UNFOLDED_ANGLE * (MAX_BRIGHTNESS - MIN_BRIGHTNESS));
  currentBrightness = Math.min(MAX_BRIGHTNESS, Math.max(currentBrightness, MIN_BRIGHTNESS));

  brightness = currentBrightness;

  view.style.filter = `brightness(${currentBrightness * PERCENT_PER_UNIT}%)`;
  view.style.backgroundPosition = `${x}px 100%`;
  view.style.transform = `scale(${scale})`;

  updateIndicators(state, { brightnessValue: currentBrightness, image });
};

const onMove = state => updateImage(state);

const rotateGesture = new RotateGesture();
const pinchGesture = new PinchGesture();
const dragGesture = new DragGesture();

const pointerController = new PointerController({
  node: view,
  gestures: [dragGesture, pinchGesture, rotateGesture],
  onMove
});

downloadImage().then((resultImage) => {
  image = resultImage;

  pointerController.init();
});
