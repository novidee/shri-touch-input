import 'pepjs';
import { PointersState } from './abstractions/types';
import PinchGesture from './gestures/pinch';
import RotateGesture from './gestures/rotate';
import DragGesture from './gestures/drag';
import PointerController from './pointer-controller';
import { updateIndicators } from './indicators';

const PERCENT_PER_UNIT = 100;
const UNFOLDED_ANGLE = 180;
const MIN_BRIGHTNESS = 0;
const MAX_BRIGHTNESS = 2;

const downloadImage = () => (
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = 'images/panorama.jpg';

    img.onload = () => resolve(img);
    img.onerror = reject;
  })
);

const init = () => {
  const view = <HTMLElement>document.querySelector('.panorama-viewer__image');
  if (!view) return;

  view.setAttribute('touch-action', 'none');

  let brightness = 1;
  let prevAngleDistance = 0;
  let image: HTMLImageElement;

  const updateImage = (panorama: HTMLElement, state: PointersState, preview: HTMLImageElement) => {
    const { x, scale, angleDistance } = state;

    let currentBrightness = brightness;
    if (prevAngleDistance !== angleDistance) {
      currentBrightness += (-angleDistance / UNFOLDED_ANGLE * (MAX_BRIGHTNESS - MIN_BRIGHTNESS));
      currentBrightness = Math.min(MAX_BRIGHTNESS, Math.max(currentBrightness, MIN_BRIGHTNESS));

      brightness = currentBrightness;
    }
    prevAngleDistance = angleDistance;

    panorama.style.filter = `brightness(${currentBrightness * PERCENT_PER_UNIT}%)`;
    panorama.style.backgroundPosition = `${x}px 100%`;
    panorama.style.transform = `scale(${scale})`;

    updateIndicators(state, { brightnessValue: currentBrightness, image: preview });
  };

  const onMove = (state: PointersState) => updateImage(view, state, image);

  const rotateGesture = new RotateGesture();
  const pinchGesture = new PinchGesture();
  const dragGesture = new DragGesture();

  const pointerController = new PointerController({
    node: view,
    gestures: [dragGesture, pinchGesture, rotateGesture],
    onMove,
  });

  downloadImage().then((resultImage) => {
    image = resultImage;

    pointerController.init();
  });
};

init();
