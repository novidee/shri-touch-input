import { getDistanceBetweenTwoPoints } from '../utils';

class PinchGesture {
  constructor(node) {
    this.node = node;
    this.prevDiff = -1;
    this.currentScale = 1;

    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerCancel = this.onPointerCancel.bind(this);
  }

  perform(pointers) {
    if (pointers.length !== 2) return;

    const { prevDiff } = this;
    const [firstPointer, secondPointer] = pointers;
    const currentDiff = Math.abs(getDistanceBetweenTwoPoints(
      firstPointer.clientX, secondPointer.clientX, firstPointer.clientY, secondPointer.clientY)
    );

    const scaleZoomFactor = (scale) => {
      var originalZoomFactor = this.currentScale;
      this.currentScale *= scale;
      this.currentScale = Math.min(4, Math.max(this.currentScale, 1));
      return this.currentScale / originalZoomFactor;
    };

    if (prevDiff > 0 && Math.abs(currentDiff - prevDiff) < 10) {
      scaleZoomFactor(currentDiff / prevDiff);
      this.node.style.transform = `scale(${this.currentScale})`;
    }

    this.prevDiff = currentDiff;

    return {
      scale: this.currentScale
    };
  }

  onPointerCancel() {
    this.prevDiff = -1;
  }

  onPointerUp() {
    this.prevDiff = -1;
  }
}

export default PinchGesture;
