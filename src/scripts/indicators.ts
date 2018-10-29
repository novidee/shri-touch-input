const PERCENT_PER_UNIT = 100;

const SELECTORS = {
  preview: '.view-info__preview',
  indicator: '.view-info__indicator',
  scaleValue: '.view-info__field--scale .view-info__value',
  brightnessValue: '.view-info__field--brightness .view-info__value'
};

const updateIndicators = ({ x, scale }, { brightnessValue, image }) => {
  const { clientWidth: documentWidth, offsetHeight: documentHeight } = document.documentElement;
  const pixelRatio = window.devicePixelRatio;
  const imageWidth = image.width / pixelRatio;
  const imageHeight = image.height / pixelRatio;
  const squeezeRate = documentHeight / imageHeight;

  const preview = document.querySelector(SELECTORS.preview);
  const indicator = document.querySelector(SELECTORS.indicator);
  const previewWidth = preview.clientWidth;
  const pictureRate = documentWidth / imageWidth / squeezeRate;

  const previewIndicatorWidth = pictureRate / scale * previewWidth;
  const previewCenterOffset = (pictureRate * previewWidth) - (pictureRate * previewWidth / scale);

  const indicatorX = -previewWidth / (imageWidth * squeezeRate) * x
    + previewCenterOffset / 2;

  indicator.style.backgroundImage = `repeating-linear-gradient(
    to right,
    transparent,
    transparent ${previewIndicatorWidth}px,
    rgba(0,0,0, 0.5) ${previewIndicatorWidth}px,
    rgba(0,0,0, 0.5) 100%)`;
  indicator.style.backgroundPosition = `${indicatorX}px 100%`;

  const scaleValueNode = document.querySelector(SELECTORS.scaleValue);
  scaleValueNode.innerHTML = `${Math.round(scale * PERCENT_PER_UNIT)}%`;

  const brightnessValueNode = document.querySelector(SELECTORS.brightnessValue);
  brightnessValueNode.innerHTML = `${Math.round(brightnessValue * PERCENT_PER_UNIT)}%`;
};

export {
  updateIndicators
};
