import { createArrayPictures } from './data.js';
import { createMiniatures } from './miniatures.js';
import './full-photo.js';
import './validation.js';
import './upload-file.js';

const miniaturesData = createArrayPictures();
createMiniatures(miniaturesData);

export { miniaturesData };
