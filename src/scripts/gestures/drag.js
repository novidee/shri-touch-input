class DragGesture {
  constructor() {
    this.isActive = false;
    this.lastPosition = { x: 0, y: 0 };
    this.gesturePosition = { x: 0, y: 0 };
    this.startPosition = { x: 0, y: 0 };
    this.POINTERS_COUNT = 1;
    this.PICTURE_WIDTH = 4821;
    this.PICTURE_HEIGHT = 928;

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerCancel = this.onPointerCancel.bind(this);
  }

  perform(pointers, event, state) {
    const { isActive, gesturePosition, startPosition, POINTERS_COUNT } = this;

    if (pointers.length !== POINTERS_COUNT) return;

    const { scale = 1 } = state;
    if (!isActive) return;

    const { x, y } = event;
    const dx = (x - gesturePosition.x) / scale;
    const dy = (y - gesturePosition.y) / scale;

    const newX = startPosition.x + dx;
    const newY = startPosition.y + dy;

    const { clientWidth: documentWidth, offsetHeight: documentHeight } = document.documentElement;
    const squeezeRate = documentHeight / this.PICTURE_HEIGHT;

    const preview = document.querySelector('.view-info__preview');
    const indicator = document.querySelector('.view-info__indicator');
    const previewWidth = preview.clientWidth;
    const pictureRate = documentWidth / this.PICTURE_WIDTH / squeezeRate;

    const previewIndicatorWidth = pictureRate / scale * previewWidth;
    const previewCenterOffset = (pictureRate * previewWidth) - (pictureRate * previewWidth / scale);

    const indicatorX = -previewWidth / (this.PICTURE_WIDTH * squeezeRate) * newX
      + previewCenterOffset / 2;

    indicator.style.backgroundImage = `repeating-linear-gradient(to right, transparent, transparent ${previewIndicatorWidth}px, rgba(0,0,0, 0.5) ${previewIndicatorWidth}px, rgba(0,0,0, 0.5) 100%)`;
    indicator.style.backgroundPosition = `${indicatorX}px 100%`;

    this.lastPosition = {
      x: newX,
      y: newY
    };

    return {
      x: newX
    };
  }

  onPointerDown(event) {
    this.isActive = true;
    this.gesturePosition = { x: event.x, y: event.y };
    this.startPosition = { x: this.lastPosition.x, y: this.lastPosition.y };
  }

  onPointerUp() {
    this.isActive = false;
  }

  onPointerCancel() {
    this.isActive = false;
  }
}

export default DragGesture;
