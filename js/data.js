import { getRandomInteger, getRandomArrayElement } from './util.js';

const PICTURE_COUNT = 25;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const AVATAR_COUNT = 6;
const DESCRIPTIONS = ['Не позволяйте кому-то затушить ваши искры только потому, что их свет сияет в чьих-то глазах.', 'Всегда начинайте свой день с хороших людей и кофе.', 'Будьте счастливы в этот момент, потому что этот момент — и есть ваша жизнь.', 'Утром, только одна хорошая мысль меняет смысл целого дня.', 'Независимо от того, что вы делаете в жизни, убедитесь, что это то, что делает вас счастливыми.'];
const NAMES = ['Иван', 'Сергей', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита'];
const COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const createIdGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getCommentMessage = () => {
  const commentValues = getRandomInteger(1, 2);
  if (commentValues === 2) {
    return `${getRandomArrayElement(COMMENTS)} ${getRandomArrayElement(COMMENTS)}`;
  }
  return COMMENTS[getRandomInteger(0, COMMENTS.length - 1)];
};

const createPictureObject = () => {
  const photoId = createIdGenerator(1, PICTURE_COUNT);
  const photoUrl = createIdGenerator(1, PICTURE_COUNT);
  const getPhotoDescription = () => getRandomArrayElement(DESCRIPTIONS);
  const getPhotoLikes = () => getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT);
  const commentId = createIdGenerator(1, PICTURE_COUNT);
  const commentAvatar = createIdGenerator(1, AVATAR_COUNT);
  const getCommentName = () => getRandomArrayElement(NAMES);

  return {
    id: photoId(),
    url: `photos/${photoUrl()}.jpg`,
    description: getPhotoDescription(),
    likes: getPhotoLikes(),
    comments: {
      id: commentId(),
      avatar: `img/avatar-${commentAvatar()}.svg`,
      message: getCommentMessage(),
      name: getCommentName()
    },
  };
};

const createArrayPictures = () => Array.from({ length: PICTURE_COUNT }, createPictureObject);

export { createArrayPictures };
