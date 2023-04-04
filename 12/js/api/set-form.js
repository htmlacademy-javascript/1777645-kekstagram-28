import { imgUploadForm } from '../upload-file.js';
import { pristine, blockSubmitButton, unblockSubmitButton } from '../validation.js';
import { showMessage, modalUpload } from '../messages.js';
import { sendData } from './api.js';

const StatusMessage = { SUCCESS: 'success', ERROR: 'error' };

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();
      modalUpload();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(() => {
          showMessage(StatusMessage.SUCCESS);
        })
        .catch(() => {
          showMessage(StatusMessage.ERROR);
        })
        .finally(unblockSubmitButton);
    }
  });
};

export { setUserFormSubmit };
