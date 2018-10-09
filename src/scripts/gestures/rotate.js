import { getAngle, getMidpoint, getRightestPointer } from '../utils';

const UNFOLDED_ANGLE = 180;
const RIGHT_ANGLE = 90;
const PERCENT_PER_UNIT = 100;

class RotateGesture {
  constructor(node) {
    this.node = node;
    this.prevAngle = 0;
    this.brightness = 1;
    this.MIN_BRIGHTNESS = 0;
    this.MAX_BRIGHTNESS = 2;
    this.POINTERS_COUNT = 2;

    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerCancel = this.onPointerCancel.bind(this);
  }

  perform(pointers) {
    if (pointers.length !== this.POINTERS_COUNT) return;

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

    if (distance > RIGHT_ANGLE) distance -= UNFOLDED_ANGLE;
    else if (distance < -RIGHT_ANGLE) distance += UNFOLDED_ANGLE;

    let currentBrightness = this.brightness
      + (distance / UNFOLDED_ANGLE * (MAX_BRIGHTNESS - MIN_BRIGHTNESS));
    currentBrightness = Math.min(MAX_BRIGHTNESS, Math.max(currentBrightness, MIN_BRIGHTNESS));

    this.prevAngle = currentAngle;
    this.brightness = currentBrightness;

    this.node.style.filter = `brightness(${currentBrightness * PERCENT_PER_UNIT}%)`;

    const valueNode = document.querySelector('.view-info__field--brightness .view-info__value');
    valueNode.innerHTML = `${Math.round(currentBrightness * PERCENT_PER_UNIT)}%`;

    return {
      angleDistance: distance
    };
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
