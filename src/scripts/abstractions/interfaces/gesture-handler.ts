interface IGestureHandler {
  onPointerDown?(event: PointerEvent): void;
  onPointerUp?(event: PointerEvent): void;
  onPointerCancel?(event: PointerEvent): void;
}

export {
  IGestureHandler,
};
