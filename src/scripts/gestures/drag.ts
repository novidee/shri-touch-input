import { IGesture } from '../abstractions/interfaces';
import { Point, PointersState } from '../abstractions/types';

const POINTERS_COUNT = 1;

class DragGesture implements IGesture {
  private lastPosition: Point;
  private gesturePosition: Point;

  constructor() {
    this.lastPosition = { x: 0, y: 0 };
    this.gesturePosition = { x: 0, y: 0 };

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
  }

  perform(pointers: PointerEvent[], event: PointerEvent, state: PointersState) {
    const { gesturePosition, lastPosition } = this;

    if (pointers.length !== POINTERS_COUNT) return state;

    const { scale = 1 } = state;

    const { x, y } = event;
    const { movementX, movementY } = this.getMovement(event, gesturePosition);
    const dx = movementX / scale;
    const dy = movementY / scale;

    const newX = lastPosition.x + dx;
    const newY = lastPosition.y + dy;

    this.lastPosition = { x: newX, y: newY };
    this.gesturePosition = { x, y };

    return Object.assign({}, state, {
      x: newX,
      y: newY,
    });
  }

  reset() {
    this.gesturePosition = { x: 0, y: 0 };
  }

  getMovement(event: PointerEvent, gesturePosition: Point) {
    const { x, y } = event;

    const prevX = gesturePosition.x === 0 ? x : gesturePosition.x;
    const prevY = gesturePosition.y === 0 ? y : gesturePosition.y;

    const movementX = event.movementX || x - prevX;
    const movementY = event.movementY || y - prevY;

    return {
      movementX,
      movementY,
    };
  }

  onPointerDown(event: PointerEvent) {
    this.gesturePosition = { x: event.x, y: event.y };
  }

  onPointerUp() {
    this.reset();
  }
}

export default DragGesture;
