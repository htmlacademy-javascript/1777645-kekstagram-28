import { createArrayPictures } from './data.js';
import { createMiniatures } from './miniatures.js';
import './full-photo.js';
import './upload-file.js';
import './validation.js';

const miniaturesData = createArrayPictures();
createMiniatures(miniaturesData);

export { miniaturesData };
