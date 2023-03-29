const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;
const PERCENT = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const scalePreview = (value) => {
  imgUploadPreview.style.transform = `scale(${value / PERCENT})`;
  scaleControlValue.value = `${value}%`;
};

const onButtonSmallerClick = () => {
  let currentValue = parseInt(scaleControlValue.value, 10);
  if (currentValue > MIN_SCALE_VALUE) {
    currentValue -= SCALE_STEP;
  }
  scalePreview(currentValue);
};

const onButtonBiggerClick = () => {
  let currentValue = parseInt(scaleControlValue.value, 10);
  if (currentValue < MAX_SCALE_VALUE) {
    currentValue += SCALE_STEP;
  }
  scalePreview(currentValue);
};

const resetScale = () => scalePreview(DEFAULT_SCALE_VALUE);

const addScaleListener = () => {
  scaleControlSmaller.addEventListener('click', onButtonSmallerClick);
  scaleControlBigger.addEventListener('click', onButtonBiggerClick);
};

const deleteScaleListener = () => {
  scaleControlSmaller.removeEventListener('click', onButtonSmallerClick);
  scaleControlBigger.removeEventListener('click', onButtonBiggerClick);
};

export { resetScale, deleteScaleListener, addScaleListener };
