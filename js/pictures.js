'use strict';

var pictureComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var pictureDescription = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. ',
  'Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomElemFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomPictures = function (quantity) {
  var randomPictures = [];
  for (var i = 1; i <= quantity; i++) {
    randomPictures.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: getRandomElemFromArray(pictureComments),
      description: getRandomElemFromArray(pictureDescription)
    });
  }
  return randomPictures;
};

var images = getRandomPictures(25);

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var getRenderPicture = function (picture) {
  var renderElement = pictureTemplate.cloneNode(true);
  renderElement.querySelector('.picture__img').src = picture.url;
  renderElement.querySelector('.picture__img').alt = picture.description;
  renderElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  renderElement.querySelector('.picture__stat--comments').textContent = picture.comments;
  return renderElement;
};

var picturesContainer = document.querySelector('.pictures');
var randomAvatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';

var displayPhoto = function (photo) {
  document.querySelector('.big-picture__img img').src = photo.url;
  document.querySelector('.likes-count').textContent = photo.likes;
  document.querySelector('.comments-count').textContent = photo.comments.length;
  document.querySelector('.social__caption').textContent = photo.description;

  document.querySelector('.social__text').textContent = photo.comments;
  document.querySelector('.social__picture').src = randomAvatar;

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__loadmore').classList.add('visually-hidden');
  document.querySelector('.big-picture').classList.remove('hidden');
};

displayPhoto(images[1]);

var fragment = document.createDocumentFragment();

for (var i = 0; i < images.length; i++) {
  fragment.appendChild(getRenderPicture(images[i]));
  picturesContainer.appendChild(fragment);
}
