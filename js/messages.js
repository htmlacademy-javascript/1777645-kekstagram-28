import { isEscapeKey } from './util.js';
import { addDocumentListener, dellDocumentListener } from './upload-file.js';

const messageFragment = document.createDocumentFragment();
const CLASS_ERROR = 'error';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error-message');
  alertContainer.textContent = message;
  document.body.append(alertContainer);
};

const modalUpload = () => {
  const uploadTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message');
  const uploadElement = uploadTemplate.cloneNode(true);
  messageFragment.append(uploadElement);
  document.body.append(messageFragment);
};

const pressingKey = (value) => {
  const windowMessage = document.querySelector(`.${value}`);
  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      if (windowMessage.matches(`.${CLASS_ERROR}`)) {
        addDocumentListener();
      }
      windowMessage.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };
  document.addEventListener('keydown', onDocumentKeydown);
};

const onButtonCloseClick = (value) => {
  const messageButton = document.querySelector(`.${value}__button`);
  messageButton.addEventListener('click', (evt) => {
    document.querySelector(`.${value}`).remove();
    if (evt.target.matches(`.${CLASS_ERROR}__button`)) {
      addDocumentListener();
    }
  });
};

const isMessage = (value) => {
  const windowMessage = document.querySelector(`.${value}`);
  const onCloseMessageClick = (evt) => {
    if (windowMessage === evt.target) {
      windowMessage.remove();
    }
    if (evt.target.matches(`.${CLASS_ERROR}`)) {
      addDocumentListener();
    }
  };
  windowMessage.addEventListener('click', onCloseMessageClick);
};

const modalMessage = (value) => {
  document.querySelector('.img-upload__message').remove();
  const messageTemplate = document.querySelector(`#${value}`).content.querySelector(`.${value}`);
  const messageElement = messageTemplate.cloneNode(true);
  messageFragment.append(messageElement);
  document.body.append(messageFragment);

  if (messageElement.matches(`.${CLASS_ERROR}`)) {
    dellDocumentListener();
  }
};

const showMessage = (value) => {
  modalMessage(value);
  isMessage(value);
  onButtonCloseClick(value);
  pressingKey(value);
};

export { showAlert, modalUpload, showMessage };
