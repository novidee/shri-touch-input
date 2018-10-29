import { PointersState } from '../types';

interface IGesture {
  perform(pointers: PointerEvent[], event: PointerEvent, state: PointersState): void;
  reset(): void;
}

export {
  IGesture,
};
