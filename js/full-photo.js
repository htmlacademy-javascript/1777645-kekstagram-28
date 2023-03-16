import { miniatures, picturesContainer } from './miniatures.js';
import { isEscapeKey, makeElement } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUsersModal();
  }
};

const openUsersModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUsersModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const clearComments = () => {
  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }
};

const createComment = (array) => {
  array.forEach((item) => {
    const commentList = makeElement('li', 'social__comment');
    const commentPhoto = makeElement('img', 'social__picture');
    const commentText = makeElement('p', 'social__text');
    commentPhoto.src = item.avatar;
    commentPhoto.alt = item.name;
    commentText.textContent = item.message;
    commentList.appendChild(commentPhoto);
    commentList.appendChild(commentText);
    commentsContainer.appendChild(commentList);
  });
};

const openFullPhoto = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const target = evt.target.closest('.picture');

    const currentItem = miniatures.find((item) => item.id === Number(target.dataset.id));
    bigPicture.querySelector('.big-picture__img img').src = currentItem.url;
    bigPicture.querySelector('.big-picture__img img').alt = currentItem.description;
    bigPicture.querySelector('.likes-count').textContent = currentItem.likes;
    bigPicture.querySelector('.comments-count').textContent = currentItem.length;
    bigPicture.querySelector('.social__caption').textContent = currentItem.description;
    openUsersModal();
    clearComments();
    createComment(currentItem.comments);

    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
  }
};

picturesContainer.addEventListener('click', openFullPhoto);

bigPictureClose.addEventListener('click', () => {
  closeUsersModal();
});

