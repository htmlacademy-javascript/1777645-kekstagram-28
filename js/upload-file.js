import { pristine } from './validation.js';
import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffect } from './effect.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUsersModal();
  }
};

const openUsersModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  resetScale();
};

function closeUsersModal() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadForm.reset();
  pristine.reset();
  removeInputListener();
  resetEffect();
}

const inputInFocus = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};

const inputOutFocus = () => {
  document.addEventListener('keydown', onDocumentKeydown);
};

const addInputListener = () => {
  textHashtags.addEventListener('focus', inputInFocus);
  textHashtags.addEventListener('blur', inputOutFocus);
  textDescription.addEventListener('focus', inputInFocus);
  textDescription.addEventListener('blur', inputOutFocus);
};

function removeInputListener() {
  textHashtags.removeEventListener('focus', inputInFocus);
  textHashtags.removeEventListener('blur', inputOutFocus);
  textDescription.removeEventListener('focus', inputInFocus);
  textDescription.removeEventListener('blur', inputOutFocus);
}

const showImageEditor = () => {
  openUsersModal();
  addInputListener();
};

uploadFile.addEventListener('change', showImageEditor);

imgUploadCancel.addEventListener('click', closeUsersModal);

export { imgUploadForm };
