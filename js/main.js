const FIRST_NUMBER = 25;
const SECOND_NUMBER = 15;
const THIRD_NUMBER = 200;
const FOURTH_NUMBER = 6;
const SIMILAR_PHOTO_COUNT = 25;

const DESCRIPTION = ['Не позволяйте кому-то затушить ваши искры только потому, что их свет сияет в чьих-то глазах.', 'Всегда начинайте свой день с хороших людей и кофе.', 'Будьте счастливы в этот момент, потому что этот момент — и есть ваша жизнь.', 'Утром, только одна хорошая мысль меняет смысл целого дня.', 'Независимо от того, что вы делаете в жизни, убедитесь, что это то, что делает вас счастливыми.'];

const NAME = ['Иван', 'Сергей', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита'];

const COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomIdFromRangeGenerator = (min, max) => {
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
  if (commentValues >= 2) {
    return `${getRandomArrayElement(COMMENTS)} ${getRandomArrayElement(COMMENTS)}`;
  }
  return COMMENTS[getRandomInteger(0, COMMENTS.length - 1)];
};

const getPhotoId = createRandomIdFromRangeGenerator(1, FIRST_NUMBER);
const getPhotoUrl = createRandomIdFromRangeGenerator(1, FIRST_NUMBER);
const getPhotoDescription = () => getRandomArrayElement(DESCRIPTION);
const getPhotoLikes = () => getRandomInteger(SECOND_NUMBER, THIRD_NUMBER);
const getCommentId = createRandomIdFromRangeGenerator(1, THIRD_NUMBER);
const getCommentAvatar = createRandomIdFromRangeGenerator(1, FOURTH_NUMBER);
const getCommentName = () => getRandomArrayElement(NAME);

const createPictureDescription = () => ({
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
const pictureDescription = Array.from({ length: SIMILAR_PHOTO_COUNT }, createPictureDescription);
