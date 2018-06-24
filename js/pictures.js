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
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
  return pictureElement;
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
  openBigPicture();
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
    closeBigPicture();
  }
};

// функция которая срабатывает, если передаем ее вторым аргументом в другой функции event
// открывает большую картинку только если было нажатие на элементе с классом picture__img

var onPictureClick = function (evt) {
  if (evt.target.className === 'picture__img') {
    openBigPicture();
  }
}

// вызываем слушатель по клику на маленькую картинку и соответсвенно открываем большую картнинку

pictures.addEventListener('click', onPictureClick);

// устанавливаем слушатель по нажатию на малeнькую картинку с помощью ENTER

pictures.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openBigPicture();
  }
});

// функция для event'a для закрытия большой картинки по клику

var onBigPictureCloseClick = function () {
  closeBigPicture();
}

// функционал открытия большой картинки. устанавливаем слушатель - по ESC закрытие, удаляем слушатель на клик по маленькой картинке
// устанавливаем слушатель для клика по крестику "закрыть"

var openBigPicture = function () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onImageEscPress);
  pictures.removeEventListener('click', onPictureClick);
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
};

// функционал закрытия большой картинки. удаляем слушаетель по нажатию ESC и устанавливаем слушатель на клик по мальнькой картинке
// удаляем слушатель для клика по крестику "закрыть"

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onImageEscPress);
  pictures.addEventListener('click', onPictureClick);
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
};

// загрузка изображения и показ формы

var uploadFile = pictures.querySelector('#upload-file');
var effectsContainer = pictures.querySelector('.img-upload__overlay');
var uploadCancel = pictures.querySelector('#upload-cancel');

// функция для event'a для открытия интерфейса с фильтрами по загрузке фото

var onUploadChange = function () {
  openUpload();
}

// устанавливаем слушатель на клик по иконке загрузки фото и соответсвенно показываем интерфейс с фильтрами

uploadFile.addEventListener('change', onUploadChange);

// функция открытия интерфейса с фильтрами, устанавливаем слушатель на ESC и удаляем слушатель для загрузки фото
// устанавливаем слушатели по нажитию на ENTER и клик по крестику

var openUpload = function () {
  effectsContainer.classList.remove('hidden');
  document.addEventListener('keydown', onUploadEscPress);
  uploadFile.removeEventListener('change', onUploadChange);
  uploadCancel.addEventListener('click', onUploadCancelClick);
  uploadCancel.addEventListener('keydown', onUploadCancelPress);
}

// функция закрытия окна редактирования фото, удаляем слушатель на ESC и утанавливаем слушатель для загрузки фото
// удаляем слушатели по нажитию на ENTER и клик по крестику

var closeUpload = function () {
  effectsContainer.classList.add('hidden');
  document.removeEventListener('keydown', onUploadEscPress);
  uploadFile.addEventListener('change', onUploadChange);
  uploadCancel.removeEventListener('click', onUploadCancelClick);
  uploadCancel.removeEventListener('keydown', onUploadCancelPress);
}

// функция для event'a при нажатии на ESC- закрывается интерфейс с фильтрами

var onUploadEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUpload();
  }
}

// функция для event'a при клике на крестик- закрывается интерфейс с фильтрами

var onUploadCancelClick = function () {
  closeUpload();
}

// функция для event'a при нажатии на ENTER на крестике - закрывается интерфейс с фильтрами

var onUploadCancelPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUpload();
  }
}

// управление ползунком и фильтрами

var scalePin = effectsContainer.querySelector('.scale__pin');
var scaleLevel = effectsContainer.querySelector('.scale__level');

// функция позиционирования ползунка на шкале

var setDefaultPinPosition = function () {
  scalePin.style.left = '50%';
  scaleLevel.style.width = '50%';
}

setDefaultPinPosition();

var filterList = effectsContainer.querySelector('.effects__list');
var scaleLine = effectsContainer.querySelector('.scale__line');

// устанавливаем изначальное значение фильтра, которое будет меняться

var currentFilter = 'none';

// слушаем изменения в списке фильтров

filterList.addEventListener('change', onChange);

// слушаем отпускание пина, обьявляем переменные 1.текущая позиция ползунка 2.стиль текущего фильтра
// который расчитан в функции getValueFilter()

scalePin.addEventListener('mouseup', function() {
  var value = parseInt(scalePin.style.left, 10);
  var filterStyle = getValueFilter(currentFilter, value);
});

// функция рассчета фильтра в зависимости от положения ползунка и текущего эффекта

var getValueFilter = function (filterType, value) {
   var levelsFilters = {
    none: '',
    chrome: 'grayscale(' + value / 100 + ')',
    sepia: 'sepia(' + value / 100 + ')',
    marvin: 'invert(' + value + '%)',
    phobos: 'blur(' + 3 * value / 100 + 'px)',
    heat: 'brightness(' + ((2 * value / 100) + 1) + ')'
  };
  return levelsFilters[filterType];
}

var imagePreview = document.querySelector('.img-upload__preview');
console.log(imagePreview);

var onChange = function (evt) {
  var filterType = evt.target.value; // sepia;
  imagePreview.classList.add('effects__preview--'+ filterType);
  imagePreview.classList.remove('effects__preview--'+ currentFilter);
  currentFilter = filterType;
  var value = parseInt(scalePin.style.left, 10) //50
  var filterStyle = getValueFilter(filterType, value);
  imagePreview.style.filter = filterStyle;
}

var effectsItem = effectsContainer.querySelector('.effects__item')
console.log(effectsItem)
