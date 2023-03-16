import { createArrayPictures } from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();
const miniatures = createArrayPictures();

miniatures.forEach(({ id, url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.id = id;
  pictureFragment.appendChild(pictureElement);
  picturesContainer.appendChild(pictureFragment);
});

export { miniatures, picturesContainer };
