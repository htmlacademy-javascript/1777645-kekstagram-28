import { imgUploadForm } from './upload-file.js';

const HASHTAG = /^#[a-zа-яё0-9]{1,}$/i;
const HASHTAG_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const ErrorMessage = {
  NAME: 'Хэш-тег начинается с символа #, состоит из букв и чисел, и разделяется пробелом.',
  LENGTH: 'Максимальная длина одного хэш-тега 20 символов, включая решётку.',
  COUNT: 'Нельзя указать больше 5 хэш-тегов.',
  DUPLICATE: 'Один и тот же хэш-тег не может быть использован дважды.',
  MESSAGE: 'Длина комментария не может составлять больше 140 символов.'
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

const checkHashtagName = (value) => {
  const hashtagArray = value.split(' ');
  return !value.length ? true : hashtagArray.every((hashtag) => HASHTAG.test(hashtag));
};

const checkHashtagLength = (value) => {
  const hashtagArray = value.split(' ');
  return hashtagArray.every((hashtag) => hashtag.length <= HASHTAG_MAX_LENGTH);
};

const checkHashtagCount = (value) => {
  const hashtagArray = value.split(' ');
  return hashtagArray.length <= HASHTAG_MAX_COUNT;
};

const checkHashtagDublicates = (value) => {
  const hashtagArray = value.toLowerCase().split(' ');
  return new Set(hashtagArray).size === hashtagArray.length;
};

const checkComment = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(textHashtags, checkHashtagName, ErrorMessage.NAME);

pristine.addValidator(textHashtags, checkHashtagLength, ErrorMessage.LENGTH);

pristine.addValidator(textHashtags, checkHashtagCount, ErrorMessage.COUNT);

pristine.addValidator(textHashtags, checkHashtagDublicates, ErrorMessage.DUPLICATE);

pristine.addValidator(textDescription, checkComment, ErrorMessage.MESSAGE);

imgUploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export { pristine };
