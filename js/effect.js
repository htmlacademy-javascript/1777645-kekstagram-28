const EFFECTS = [
  { NAME: 'none', STYLE: 'none', MIN: 0, MAX: 100, STEP: 1, UNIT: '' },
  { NAME: 'chrome', STYLE: 'grayscale', MIN: 0, MAX: 1, STEP: 0.1, UNIT: '' },
  { NAME: 'sepia', STYLE: 'sepia', MIN: 0, MAX: 1, STEP: 0.1, UNIT: '' },
  { NAME: 'marvin', STYLE: 'invert', MIN: 0, MAX: 100, STEP: 1, UNIT: '%' },
  { NAME: 'phobos', STYLE: 'blur', MIN: 0, MAX: 3, STEP: 0.1, UNIT: 'px' },
  { NAME: 'heat', STYLE: 'brightness', MIN: 1, MAX: 3, STEP: 0.1, UNIT: '' }];

const DEFAULT_EFFECT = EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const isDefault = () => currentEffect === DEFAULT_EFFECT;

const showSlider = () => {
  imgUploadEffectLevel.classList.remove('hidden');
};

const hideSlider = () => {
  imgUploadEffectLevel.classList.add('hidden');
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: DEFAULT_EFFECT.MIN,
    max: DEFAULT_EFFECT.MAX,
  },
  start: DEFAULT_EFFECT.MAX,
  step: DEFAULT_EFFECT.STEP,
  connect: 'lower'
});

const updateSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.MIN,
      max: currentEffect.MAX,
    },
    step: currentEffect.STEP
  });
  effectLevelSlider.noUiSlider.set(currentEffect.MAX);
};

const onEffectsChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = EFFECTS.find((effect) => effect.NAME === evt.target.value);
    imgUploadPreview.className = `effects__preview--${currentEffect.NAME}`;
    updateSlider();
  }
};

const sliderUpdate = () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  imgUploadPreview.style.filter = isDefault() ? DEFAULT_EFFECT.STYLE : `${currentEffect.STYLE}(${effectLevelValue.value}${currentEffect.UNIT})`;

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const resetEffect = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

effectsList.addEventListener('change', onEffectsChange);

effectLevelSlider.noUiSlider.on('update', sliderUpdate);

export { resetEffect };
