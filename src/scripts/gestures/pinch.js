import { getDistanceBetweenTwoPoints } from '../utils';

const PERCENT_PER_UNIT = 100;

class PinchGesture {
  constructor(node) {
    this.node = node;
    this.prevDiff = -1;
    this.currentScale = 1;
    this.MIN_SCALE = 1;
    this.MAX_SCALE = 4;
    this.POINTERS_COUNT = 2;
    this.MIN_DIFF = 10;

    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerCancel = this.onPointerCancel.bind(this);
  }

  perform(pointers) {
    if (pointers.length !== this.POINTERS_COUNT) return;

    const { prevDiff, MIN_DIFF } = this;

    const [firstPointer, secondPointer] = pointers;
    const currentDiff = Math.abs(getDistanceBetweenTwoPoints(
      firstPointer.clientX,
      secondPointer.clientX,
      firstPointer.clientY,
      secondPointer.clientY
    ));

    if (prevDiff > 0 && Math.abs(currentDiff - prevDiff) < MIN_DIFF) {
      this.changeScaleFactor(currentDiff / prevDiff);
      this.node.style.transform = `scale(${this.currentScale})`;
    }

    this.prevDiff = currentDiff;

    const valueNode = document.querySelector('.view-info__field--scale .view-info__value');
    valueNode.innerHTML = `${Math.round(this.currentScale * PERCENT_PER_UNIT)}%`;

    return {
      scale: this.currentScale
    };
  }

  reset() {
    this.prevDiff = -1;
  }

  changeScaleFactor(scale) {
    const { currentScale, MAX_SCALE, MIN_SCALE } = this;

    const newScale = currentScale * scale;
    this.currentScale = Math.min(MAX_SCALE, Math.max(newScale, MIN_SCALE));
  }

  onPointerCancel() {
    this.reset();
  }

  onPointerUp() {
    this.reset();
  }
}

export default PinchGesture;
