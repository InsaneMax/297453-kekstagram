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

// функция - обработчик закрытия галереи при нажатии ESC

var onImageEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

// функция для event'a для закрытия большой картинки по клику

var onBigPictureCloseClick = function () {
  closeBigPicture();
};

// функционал открытия большой картинки. устанавливаем слушатель - по ESC закрытие, удаляем слушатель на клик по маленькой картинке
// устанавливаем слушатель для клика по крестику "закрыть"

var openBigPicture = function (object) {
  bigPicture.classList.remove('hidden');
  changeBigPictureContent(object);
  document.addEventListener('keydown', onImageEscPress);
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
};

// функционал закрытия большой картинки. удаляем слушаетель по нажатию ESC и устанавливаем слушатель на клик по мальнькой картинке
// удаляем слушатель для клика по крестику "закрыть"

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onImageEscPress);
};

// загрузка изображения и показ формы

var uploadFile = picturesContainer.querySelector('#upload-file');
var effectsContainer = picturesContainer.querySelector('.img-upload__overlay');
var uploadCancel = picturesContainer.querySelector('#upload-cancel');

// функция для event'a для открытия интерфейса с фильтрами по загрузке фото

var onUploadChange = function () {
  openUpload();
};

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
};

// функция закрытия окна редактирования фото, удаляем слушатель на ESC и утанавливаем слушатель для загрузки фото
// удаляем слушатели по нажитию на ENTER и клик по крестику

var closeUpload = function () {
  effectsContainer.classList.add('hidden');
  document.removeEventListener('keydown', onUploadEscPress);
  uploadFile.addEventListener('change', onUploadChange);
  uploadCancel.removeEventListener('click', onUploadCancelClick);
  uploadCancel.removeEventListener('keydown', onUploadCancelPress);
};

// функция для event'a при нажатии на ESC- закрывается интерфейс с фильтрами

var onUploadEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUpload();
  }
};

// функция для event'a при клике на крестик- закрывается интерфейс с фильтрами

var onUploadCancelClick = function () {
  closeUpload();
};

// функция для event'a при нажатии на ENTER на крестике - закрывается интерфейс с фильтрами

var onUploadCancelPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUpload();
  }
};

// далее код для работы функциоанала фильтров

var scalePin = effectsContainer.querySelector('.scale__pin');
var scaleLevel = effectsContainer.querySelector('.scale__level');

// функция позиционирования ползунка на шкале

var setDefaultPinPosition = function () {
  scalePin.style.left = '30%';
  scaleLevel.style.width = '30%';
};

setDefaultPinPosition();

var filterList = effectsContainer.querySelector('.effects__list');

// устанавливаем изначальное значение фильтра, которое будет меняться

var currentFilter = 'none';

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
};

var imagePreview = document.querySelector('.img-upload__preview img');

// функция для event'a чтобы менять классы и добавлять стили на большой картинке в зависимости от текущего фильтра

var onChange = function (evt) {
  var filterType = evt.target.value; // sepia;
  imagePreview.classList.add('effects__preview--' + filterType);
  imagePreview.classList.remove('effects__preview--' + currentFilter);
  currentFilter = filterType;
  var value = parseInt(scalePin.style.left, 10); // 30
  var filterStyle = getValueFilter(filterType, value);
  imagePreview.style.filter = filterStyle;
};

// слушаем изменения в списке фильтров

filterList.addEventListener('change', onChange);

// слушаем отпускание пина, обьявляем переменные 1.текущая позиция ползунка 2.стиль текущего фильтра
// который расчитан в функции getValueFilter()

scalePin.addEventListener('mouseup', function () {
  var value = parseInt(scalePin.style.left, 10);
  var filterStyle = getValueFilter(currentFilter, value);
});

// функцинал изменения размеров изображения

var FULL_RESIZE = 1;
var STEP_RESIZE = 0.25;
var resize = FULL_RESIZE;

var controlMinus = effectsContainer.querySelector('.resize__control--minus');
var controlPlus = effectsContainer.querySelector('.resize__control--plus');
var controlValue = effectsContainer.querySelector('.resize__control--value');

imagePreview.style.transform = 'scale(' + FULL_RESIZE + ')';
controlValue.value = resize * 100 + '%';

var resizeRise = function () {
  if (resize !== 1) {
    resize += STEP_RESIZE;
    imagePreview.style.transform = 'scale(' + resize + ')';
    controlValue.value = resize * 100 + '%';
  }
};

var resizeDecline = function () {
  if (resize !== 0) {
    resize -= STEP_RESIZE;
    imagePreview.style.transform = 'scale(' + resize + ')';
    controlValue.value = resize * 100 + '%';
  }
};

controlPlus.addEventListener('click', function () {
  resizeRise();
});

controlMinus.addEventListener('click', function () {
  resizeDecline();
});

// валидация формы
var NEW_HASHTAG = '#';
var HASHTAG_LENGTH = 20;
var HASHTAG_COUNT = 5;

var hashtagInput = effectsContainer.querySelector('.text__hashtags');
var commentInput = effectsContainer.querySelector('.text__description');


// var onInputChange = function (evt) {
//   return evt.target.value;
// }
// hashtagInput.addEventListener('change', onInputChange);

hashtagInput.value = '#hello #oooh nice! #wtf?';

var inputValue = hashtagInput.value;

console.log(inputValue);

// подсчет кол-ва хештегов

var moreThanFive = function (str) {
  var hashtagsArray = str.split(/ +/);
  for (var i = 0; i < hashtagsArray.length; i++) {
    var count = 0;
    count += i;
  }
  return count > HASHTAG_COUNT;
}

moreThanFive(inputValue);

// подсчет кол-вы символов в хеш-теге

var countSymbols = function (str) {
  var hashtagsArray = str.split(' ');
  for(var i = 0; i < hashtagsArray.length; i++) {
    console.log(hashtagsArray[i]);
    for (var j = 0; j < hashtagsArray[i].length; j++) {

    }
      var countH = 0;
      countH += j;
      console.log(j + ' символов в этом хештеге')
  }
};

countSymbols(inputValue);

// проверка на наличие повторяющихся хештегов в массиве

var checkDuplicateHashtags = function (elem, str) {
  str.split(/ +/);
  return arr.indexOf(elem) !== arr.lastIndexOf(elem)
};

// проверка на наличие повторяющихся символов в строке

var checkDuplicateHashtagSymbol = function (elem, str) {
  return str.indexOf(elem) !== str.lastIndexOf(elem);
}

var isHashtagSymbol = function (elem, str) {
  if (str[0] !== elem) {
    return true
  }
  return false
}

// var checkValidity = function (elem, str) {
//   if (moreThanFive(str)) {
//     srt.setCustomValidity('должно быть не более 5-ти хештегов');
//   } else if (checkDuplicateHashtags(elem, arr)) {
//     str.setCustomValidity('не должно быть повторяющихся хештегов');
//   } else if (checkDuplicateHashtagSymbol(elem, str)) {
//     str.setCustomValidity('не должно быть более одного символа "#" в одном хештеге');
//     else if (isHashtagSymbol(elem, str)) {
//     str.setCustomValidity('хештег должен начинаться с решетки "#"');
//     } else {
//       alert('wow!')
//     }
//   }
// }

// checkValidity(NEW_HASHTAG, );
