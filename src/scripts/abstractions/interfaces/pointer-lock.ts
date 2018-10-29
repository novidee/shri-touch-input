declare global {
  interface Document {
    pointerLockElement: Element;
    mozPointerLockElement: Element;
    webkitPointerLockElement: Element;

    exitPointerLock: () => void;
    mozExitPointerLock: () => void;
    webkitExitPointerLock: () => void;
  }

  interface Element {
    requestPointerLock: () => void;
    mozRequestPointerLock: () => void;
    webkitRequestPointerLock: () => void;
  }
}

export {};
