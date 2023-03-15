import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LikesCount = { MIN: 15, MAX: 200 };
const CommentsCount = { MIN: 1, MAX: 5 };
const DESCRIPTIONS = ['Не позволяйте кому-то затушить ваши искры только потому, что их свет сияет в чьих-то глазах.', 'Всегда начинайте свой день с хороших людей и кофе.', 'Будьте счастливы в этот момент, потому что этот момент — и есть ваша жизнь.', 'Утром, только одна хорошая мысль меняет смысл целого дня.', 'Независимо от того, что вы делаете в жизни, убедитесь, что это то, что делает вас счастливыми.'];
const NAMES = ['Иван', 'Сергей', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита'];
const COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const commentId = createIdGenerator(1, PICTURE_COUNT);
const commentAvatar = createIdGenerator(1, AVATAR_COUNT);
const photoId = createIdGenerator(1, PICTURE_COUNT);
const photoUrl = createIdGenerator(1, PICTURE_COUNT);

const createComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${commentAvatar()}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const createPictureObject = () => ({
  id: photoId(),
  url: `photos/${photoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LikesCount.MIN, LikesCount.MAX),
  comments: Array.from({ length: getRandomInteger(CommentsCount.MIN, CommentsCount.MAX) }, createComment),
});

const createArrayPictures = () => Array.from({ length: PICTURE_COUNT }, createPictureObject);

export { createArrayPictures };
