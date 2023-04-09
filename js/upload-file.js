import { pristine } from './validation.js';
import { isEscapeKey } from './util.js';
import { addScaleListener, resetScale, deleteScaleListener } from './scale.js';
import { addEffectListener, resetEffect, deleteEffectListener, createSlider } from './effect.js';
import { showPreview, clearPreview } from './preview.js';

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

const addDocumentListener = () => {
  document.addEventListener('keydown', onDocumentKeydown);
};

const dellDocumentListener = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openUsersModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  addDocumentListener();
  imgUploadCancel.addEventListener('click', closeUsersModal);
  resetScale();
  addScaleListener();
  createSlider();
  addEffectListener();
};

function closeUsersModal() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  dellDocumentListener();
  imgUploadCancel.removeEventListener('click', closeUsersModal);
  imgUploadForm.reset();
  pristine.reset();
  removeInputListener();
  deleteScaleListener();
  resetEffect();
  deleteEffectListener();
  clearPreview();
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

const onUploadFileChange = () => {
  showPreview();
  openUsersModal();
  addInputListener();
};

uploadFile.addEventListener('change', onUploadFileChange);

export { imgUploadForm, closeUsersModal, addDocumentListener, dellDocumentListener };
