import { createMiniatures } from '../miniatures.js';
import { checkImageData } from '../full-photo.js';
import { setUserFormSubmit } from './set-form.js';
import { closeUsersModal } from '../upload-file.js';
import { getData } from './api.js';
import { showAlert } from '../messages.js';
import { onFilterClick } from '../filter.js';
import { debounce } from '../util.js';

const RERENDER_DELAY = 500;

getData()
  .then((miniatures) => {
    createMiniatures(miniatures);
    checkImageData(miniatures);
    onFilterClick(miniatures, debounce(createMiniatures, RERENDER_DELAY));
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit(closeUsersModal);
