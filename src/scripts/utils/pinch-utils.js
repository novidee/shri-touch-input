const changeScaleFactor = (currentScale, scale, maxScale, minScale) => {
  const newScale = currentScale * scale;

  return Math.min(maxScale, Math.max(newScale, minScale));
};

export {
  changeScaleFactor
};
