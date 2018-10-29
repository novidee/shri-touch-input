import { PointersState } from '../types';
import { IGestureHandler } from './gesture-handler';

interface IGesture extends IGestureHandler {
  perform(pointers: PointerEvent[], event: PointerEvent, state: PointersState): PointersState;
  reset(): void;
}

export {
  IGesture,
};
