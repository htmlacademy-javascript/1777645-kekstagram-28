const HASHTAG = /^#[a-zа-яё0-9]{1,}$/i;
const HASHTAG_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');
const ErrorMessage = {
  NAME: 'Хэш-тег начинается c символа #, состоит из букв и чисел, и разделяется пробелом.',
  LENGTH: 'Максимальная длина одного хэш-тега 20 символов, включая решётку.',
  COUNT: 'Нельзя указать больше 5 хэш-тегов.',
  DUPLICATE: 'Один и тот же хэш-тег не может быть использован дважды.',
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

const checkHashtagName = (value) => !value.length ? true : value.split(' ').every((hashtag) => HASHTAG.test(hashtag));

const checkHashtagLength = (value) => value.split(' ').every((hashtag) => hashtag.length <= HASHTAG_MAX_LENGTH);

const checkHashtagCount = (value) => value.split(' ').length <= HASHTAG_MAX_COUNT;

const checkHashtagDublicates = (value) => {
  const hashtagArray = value.toLowerCase().split(' ');
  return new Set(hashtagArray).size === hashtagArray.length;
};

const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
};

const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
};

pristine.addValidator(textHashtags, checkHashtagName, ErrorMessage.NAME);

pristine.addValidator(textHashtags, checkHashtagLength, ErrorMessage.LENGTH);

pristine.addValidator(textHashtags, checkHashtagCount, ErrorMessage.COUNT);

pristine.addValidator(textHashtags, checkHashtagDublicates, ErrorMessage.DUPLICATE);

export { pristine, blockSubmitButton, unblockSubmitButton };
