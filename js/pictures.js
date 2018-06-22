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

// создание темплейта с данными из параметра picture

var createPictureElement = function (picture) {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var renderElement = pictureTemplate.cloneNode(true);
  renderElement.querySelector('.picture__img').src = picture.url;
  renderElement.querySelector('.picture__img').alt = picture.description;
  renderElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  renderElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
  return renderElement;
};

var bigPicture = document.querySelector('.big-picture');
var bigPictureClose = document.querySelector('.big-picture__cancel');

// показ большой картинки

var displayPhoto = function (photo) {
  var randomAvatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.social__text').textContent = photo.comments;
  bigPicture.querySelector('.social__picture').src = randomAvatar;
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
  openGallery();
};

// переменная для массива с обектами похожих картинок

var images = getRandomPictures(25);

// displayPhoto(images[getRandomNumber(0, images.length)]);

var pictures = document.querySelector('.pictures');

images.forEach(function (image) {
  pictures.appendChild(createPictureElement(image));
});

// функция - обработчик закрытия галереи при нажатии ESC

var onImageEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeGallery();
  }
};

// показ большой картинки

var openGallery = function () {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.addEventListener('keydown', onImageEscPress);
};

// pictures.addEventListener('click', function () {
//   openGallery();
// });

// pictures.addEventListener('keydown', function (evt) {
//   if (evt.keyCode === ENTER_KEYCODE) {
//     openGallery();
//   }
// });

// закрытие большой картинки

var closeGallery = function () {
  document.querySelector('.big-picture').classList.add('hidden');
  document.removeEventListener('keydown', onImageEscPress);
};

bigPictureClose.addEventListener('click', function () {
  closeGallery();
});

bigPictureClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeGallery();
  }
});

// загрузка изображения и показ формы

var uploadFile = pictures.querySelector('#upload-file');
console.log(uploadFile);

var effectsContainer = pictures.querySelector('.img-upload__overlay');
console.log(effectsContainer);

var uploadCancel = pictures.querySelector('#upload-cancel');

// функция открытия окна редактирования фото

var openUpload = function () {
  effectsContainer.classList.remove('hidden');
  document.addEventListener('keydown', onUploadEscPress)
}

// функция закрытия окна редактирования фото

var closeUpload = function () {
  effectsContainer.classList.add('hidden');
  document.removeEventListener('keydown', onUploadEscPress)
}

// закрытие окна по нажатию на ESC

var onUploadEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUpload();
  }
}

uploadFile.addEventListener('change', function() {
  openUpload();
});

uploadCancel.addEventListener('click', function() {
  closeUpload();
})

var scalePin = effectsContainer.querySelector('.scale__pin');
console.log(scalePin);

scalePin.addEventListener('mouseup', function() {
  console.log('mouse up');
})

var effectsItem = effectsContainer.querySelector('.effects__item')
console.log(effectsItem)
