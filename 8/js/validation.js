import { imgUploadForm } from './upload-file.js';

const HASHTAG = /^#[a-zа-яё0-9]{1,}$/i;
const HASHTAG_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const ValidatorMessage = {
  NAME: 'Хэш-тег начинается с символа #, состоит из букв и чисел, и разделяется пробелом.',
  LENGTH: 'Максимальная длина одного хэш-тега 20 символов, включая решётку.',
  COUNT: 'Нельзя указать больше 5 хэш-тегов.',
  DUPLICATE: 'Один и тот же хэш-тег не может быть использован дважды.',
  MESSAGE: 'Длина комментария не может составлять больше 140 символов.'
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

const validateHashtagName = (value) => {
  const hashtagArray = value.split(' ');
  return !value.length ? true : hashtagArray.every((hashtag) => HASHTAG.test(hashtag));
};

const validateHashtagLength = (value) => {
  const hashtagArray = value.split(' ');
  return hashtagArray.every((hashtag) => hashtag.length <= HASHTAG_MAX_LENGTH);
};

const validateHashtagCount = (value) => {
  const hashtagArray = value.split(' ');
  return hashtagArray.length <= HASHTAG_MAX_COUNT;
};

const validateHashtagDublicates = (value) => {
  const hashtagArray = value.toLowerCase().split(' ');
  return new Set(hashtagArray).size === hashtagArray.length;
};

const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(textHashtags, validateHashtagName, ValidatorMessage.NAME);

pristine.addValidator(textHashtags, validateHashtagLength, ValidatorMessage.LENGTH);

pristine.addValidator(textHashtags, validateHashtagCount, ValidatorMessage.COUNT);

pristine.addValidator(textHashtags, validateHashtagDublicates, ValidatorMessage.DUPLICATE);

pristine.addValidator(textDescription, validateComment, ValidatorMessage.MESSAGE);

imgUploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
