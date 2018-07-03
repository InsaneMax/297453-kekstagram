'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

// случайный элемент массива

var getRandomElemFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// случайное число в диапозоне мин макс

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// случайные комментарии, лайки и описания в каждом объкте картинки

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

var bigPicture = document.querySelector('.big-picture');
var bigPictureClose = document.querySelector('.big-picture__cancel');

// показ большой картинки

var changeBigPictureContent = function (photo) {
  var randomAvatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.social__text').textContent = photo.comments;
  bigPicture.querySelector('.social__picture').src = randomAvatar;
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
};

// переменная для массива с обектами похожих картинок

var images = getRandomPictures(25);
var picturesContainer = document.querySelector('.pictures');

// создание темплейта с данными из параметра picture

var createPictureElement = function (picture) {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
  return pictureElement;
};

var createPictures = function (objects) {
  var fragment = document.createDocumentFragment();
  objects.forEach(function (image) {
    var newPicture = createPictureElement(image);
    newPicture.addEventListener('click', function () {
      openBigPicture(image);
    });
    fragment.appendChild(newPicture);
  });
  return fragment;
};

var renderPictures = function (fragment) {
  picturesContainer.appendChild(fragment);
};

var pictures = createPictures(images);

renderPictures(pictures);
