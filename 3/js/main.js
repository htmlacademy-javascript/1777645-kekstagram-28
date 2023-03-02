const PICTURE_COUNT = 25;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const AVATAR_COUNT = 6;
const DESCRIPTIONS = ['Не позволяйте кому-то затушить ваши искры только потому, что их свет сияет в чьих-то глазах.', 'Всегда начинайте свой день с хороших людей и кофе.', 'Будьте счастливы в этот момент, потому что этот момент — и есть ваша жизнь.', 'Утром, только одна хорошая мысль меняет смысл целого дня.', 'Независимо от того, что вы делаете в жизни, убедитесь, что это то, что делает вас счастливыми.'];
const NAMES = ['Иван', 'Сергей', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита'];
const COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

const getPhotoId = createIdGenerator(1, PICTURE_COUNT);
const getPhotoUrl = createIdGenerator(1, PICTURE_COUNT);
const getPhotoDescription = () => getRandomArrayElement(DESCRIPTIONS);
const getPhotoLikes = () => getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT);
const getCommentId = createIdGenerator(1, PICTURE_COUNT);
const getCommentAvatar = createIdGenerator(1, AVATAR_COUNT);
const getCommentName = () => getRandomArrayElement(NAMES);

const createPictureObject = () => ({
  id: getPhotoId(),
  url: `photos/${getPhotoUrl()}.jpg`,
  description: getPhotoDescription(),
  likes: getPhotoLikes(),
  comments: {
    id: getCommentId(),
    avatar: `img/avatar-${getCommentAvatar()}.svg`,
    message: getCommentMessage(),
    name: getCommentName()
  },
});

/* eslint-disable-next-line no-unused-vars */
const arrayPictures = Array.from({ length: PICTURE_COUNT }, createPictureObject);
