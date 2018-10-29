import { IGesture } from '../abstractions/interfaces';
import { PointersState } from '../abstractions/types';
import { getDistanceBetweenTwoPoints } from '../utils';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const POINTERS_COUNT = 2;
const MIN_DIFF = 20;

class PinchGesture implements IGesture {
  private prevDiff: number;
  private currentScale: number;

  constructor() {
    this.prevDiff = -1;
    this.currentScale = 1;

    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerCancel = this.onPointerCancel.bind(this);
  }

  perform(pointers: PointerEvent[], event: PointerEvent, state: PointersState) {
    if (pointers.length !== POINTERS_COUNT) return state;

    const { prevDiff } = this;

    const [firstPointer, secondPointer] = pointers;
    const currentDiff = Math.abs(getDistanceBetweenTwoPoints(
      firstPointer.clientX,
      secondPointer.clientX,
      firstPointer.clientY,
      secondPointer.clientY,
    ));

    let newScale = this.currentScale;
    if (prevDiff > 0 && Math.abs(currentDiff - prevDiff) < MIN_DIFF) {
      newScale = this.changeScaleFactor(currentDiff / prevDiff);
    }

    this.prevDiff = currentDiff;
    this.currentScale = newScale;

    return Object.assign({}, state, {
      scale: newScale,
    });
  }

  reset() {
    this.prevDiff = -1;
  }

  changeScaleFactor(scale: number) {
    const { currentScale } = this;

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
