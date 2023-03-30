import { createMiniatures } from '../miniatures.js';
import { checkImageData } from '../full-photo.js';
import { setUserFormSubmit } from './set-form.js';
import { closeUsersModal } from '../upload-file.js';
import { getData } from './api.js';
import { showAlert } from '../messages.js';

getData()
  .then((miniatures) => {
    createMiniatures(miniatures);
    checkImageData(miniatures);
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit(closeUsersModal);
