import { getAngle, getMidpoint, getRightestPointer } from '../utils';

class RotateGesture {
  constructor(node) {
    this.node = node;
    this.prevAngle = 0;
    this.brightness = 1;
    this.minBrightness = 0;
    this.maxBrightness = 2;

    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerCancel = this.onPointerCancel.bind(this);
  }

  perform(pointers) {
    if (pointers.length !== 2) return;

    const { prevAngle, maxBrightness, minBrightness } = this;

    const currentPivot = getMidpoint(
      pointers[0].clientX,
      pointers[1].clientX,
      pointers[0].clientY,
      pointers[1].clientY
    );
    const input = getRightestPointer(pointers);

    const currentAngle = getAngle(
      currentPivot.x,
      currentPivot.y,
      input.x,
      input.y
    );

    if (prevAngle === 0) {
      this.prevAngle = currentAngle;
      return;
    }

    let distance = prevAngle - currentAngle;
    // if (distance > 100) distance -= 180;
    // else if (distance < -100) distance += 180;

    const coef = distance / 180 * (maxBrightness - minBrightness);

    this.brightness += coef;
    this.brightness = Math.min(maxBrightness, Math.max(this.brightness, minBrightness));
    this.node.style.filter = `brightness(${this.brightness * 100}%)`;

    const el = document.querySelector('.angle');
    // el.innerHTML = `${distance}; ${prevAngle}; ${currentAngle}; ${this.brightness}; ${coef}`;
    this.prevAngle = currentAngle;
  }

  onPointerUp() {
    this.prevAngle = 0;
  }

  onPointerCancel() {
    this.prevAngle = 0;
  }
}

export default RotateGesture;
