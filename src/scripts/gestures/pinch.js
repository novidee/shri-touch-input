import { getDistanceBetweenTwoPoints } from '../utils';

class PinchGesture {
  constructor() {
    this.prevDiff = -1;
    this.currentScale = 1;
    this.MIN_SCALE = 1;
    this.MAX_SCALE = 4;
    this.POINTERS_COUNT = 2;
    this.MIN_DIFF = 20;

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

    let newScale = this.currentScale;
    if (prevDiff > 0 && Math.abs(currentDiff - prevDiff) < MIN_DIFF) {
      newScale = this.changeScaleFactor(currentDiff / prevDiff);
    }

    this.prevDiff = currentDiff;
    this.currentScale = newScale;

    return {
      scale: newScale
    };
  }

  reset() {
    this.prevDiff = -1;
  }

  changeScaleFactor(scale) {
    const { currentScale, MAX_SCALE, MIN_SCALE } = this;

    const newScale = currentScale * scale;
    return Math.min(MAX_SCALE, Math.max(newScale, MIN_SCALE));
  }

  onPointerCancel() {
    this.reset();
  }

  onPointerUp() {
    this.reset();
  }
}

export default PinchGesture;
