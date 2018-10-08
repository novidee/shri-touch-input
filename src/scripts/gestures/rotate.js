import { getAngle, getMidpoint, getRightestPointer } from '../utils';

const HALF_CIRCLE_DEGREES = 180;

class RotateGesture {
  constructor(node) {
    this.node = node;
    this.prevAngle = 0;
    this.brightness = 1;
    this.MIN_BRIGHTNESS = 0;
    this.MAX_BRIGHTNESS = 2;
    this.POINTERS_LENGTH = 2;

    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerCancel = this.onPointerCancel.bind(this);
  }

  perform(pointers) {
    if (pointers.length !== this.POINTERS_LENGTH) return;

    const { prevAngle, MAX_BRIGHTNESS, MIN_BRIGHTNESS } = this;

    const currentCenter = getMidpoint(
      pointers[0].clientX,
      pointers[1].clientX,
      pointers[0].clientY,
      pointers[1].clientY
    );
    const rightestPointer = getRightestPointer(pointers);

    const currentAngle = getAngle(
      currentCenter.x,
      currentCenter.y,
      rightestPointer.x,
      rightestPointer.y
    );

    if (prevAngle === 0) {
      this.prevAngle = currentAngle;
      return;
    }

    let distance = prevAngle - currentAngle;

    if (distance > 100) distance -= HALF_CIRCLE_DEGREES;
    else if (distance < -100) distance += HALF_CIRCLE_DEGREES;

    let currentBrightness = this.brightness
      + (distance / HALF_CIRCLE_DEGREES * (MAX_BRIGHTNESS - MIN_BRIGHTNESS));
    currentBrightness = Math.min(MAX_BRIGHTNESS, Math.max(currentBrightness, MIN_BRIGHTNESS));

    this.prevAngle = currentAngle;
    this.brightness = currentBrightness;

    this.node.style.filter = `brightness(${currentBrightness * 100}%)`;

    const valueNode = document.querySelector('.view-info__field--brightness .view-info__value');
    valueNode.innerHTML = `${Math.round(currentBrightness * 100)}%`;
  }

  reset() {
    this.prevAngle = 0;
  }

  onPointerUp() {
    this.reset();
  }

  onPointerCancel() {
    this.reset();
  }
}

export default RotateGesture;
