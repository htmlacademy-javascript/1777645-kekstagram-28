import { picturesContainer } from './miniatures.js';
import { isEscapeKey } from './util.js';

const COMMENT_SHOW_COUNT = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialContainer = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader ');

const clearComments = () => {
  bigPicture.querySelector('.social__comments').innerHTML = '';
};

const createComment = (array) => {
  array.forEach((comment) => {
    const newComment = socialComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    newComment.classList.add('hidden');
    commentsContainer.append(newComment);
  });
};

const showComment = (array, count) => {
  for (let i = 0; i < count; i++) {
    array[i].classList.remove('hidden');
  }
  socialCommentCount.textContent = `${socialContainer.querySelectorAll('li:not(.hidden)').length} из ${socialContainer.children.length} комментариев`;
};

const onLoadCommentClick = () => {
  const hiddenComments = socialContainer.querySelectorAll('.hidden');
  if (hiddenComments.length > COMMENT_SHOW_COUNT) {
    showComment(hiddenComments, COMMENT_SHOW_COUNT);
  } else {
    showComment(hiddenComments, hiddenComments.length);
    socialCommentsLoader.classList.add('hidden');
  }
};

const createDataImage = (data) => {
  bigPictureImg.src = data.url;
  bigPictureImg.alt = data.description;
  likesCount.textContent = data.likes;
  socialCaption.textContent = data.description;
};

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
  socialCommentsLoader.addEventListener('click', onLoadCommentClick);
  bigPictureClose.addEventListener('click', closeUsersModal);
};

function closeUsersModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  socialCommentsLoader.classList.remove('hidden');
  socialCommentsLoader.removeEventListener('click', onLoadCommentClick);
  bigPictureClose.removeEventListener('click', closeUsersModal);
}

const openFullImage = (data) => {
  openUsersModal();
  createDataImage(data);
  clearComments();
  createComment(data.comments);
  onLoadCommentClick();
};

const checkImageData = (data) => {
  const onImageClick = (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      const target = evt.target.closest('.picture');
      const currentData = data.find((item) => item.id === +target.dataset.id);
      return openFullImage(currentData);
    }
  };
  picturesContainer.addEventListener('click', onImageClick);
};

export { checkImageData };
