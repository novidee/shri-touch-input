import 'pepjs';

import PointerController from './pointer-controller';
import Gestures from './gestures';
import { updateIndicators } from './indicators';

const view = document.querySelector('.panorama-viewer__image');
view.setAttribute('touch-action', 'none');

const PERCENT_PER_UNIT = 100;
const UNFOLDED_ANGLE = 180;
const MIN_BRIGHTNESS = 0;
const MAX_BRIGHTNESS = 2;

let brightness = 1;
let prevAngleDistance = 0;
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

  let currentBrightness = brightness;
  if (prevAngleDistance !== angleDistance) {
    currentBrightness += (-angleDistance / UNFOLDED_ANGLE * (MAX_BRIGHTNESS - MIN_BRIGHTNESS));
    currentBrightness = Math.min(MAX_BRIGHTNESS, Math.max(currentBrightness, MIN_BRIGHTNESS));

    brightness = currentBrightness;
  }
  prevAngleDistance = angleDistance;

  view.style.filter = `brightness(${currentBrightness * PERCENT_PER_UNIT}%)`;
  view.style.backgroundPosition = `${x}px 100%`;
  view.style.transform = `scale(${scale})`;

  updateIndicators(state, { brightnessValue: currentBrightness, image });
};

const onMove = state => updateImage(state);

const gestures = new Gestures({
  onMove
});
gestures.init();

const pointerController = new PointerController({
  node: view,
  events: {
    onPointerCancel: gestures.onPointerCancel,
    onPointerUp: gestures.onPointerUp,
    onPointerDown: gestures.onPointerDown,
    onPointerMove: gestures.onPointerMove
  }
});

downloadImage().then((resultImage) => {
  image = resultImage;

  pointerController.init();
});
