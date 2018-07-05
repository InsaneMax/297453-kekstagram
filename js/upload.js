'use strict';

// загрузка изображения и показ формы

(function () {

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
  if (evt.keyCode === ESC_KEYCODE && evt.target.className !== 'text__description') {
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
var scaleLineElement = effectsContainer.querySelector('.scale__line');

// функция позиционирования ползунка на шкале

var setDefaultPinPosition = function () {
  scalePin.style.left = '40%';
  scaleLevel.style.width = '40%';
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

var startX;

var onMouseMove = function (moveEvt) {
  moveEvt.preventDefault();

  var shiftX = startX - moveEvt.clientX;
  startX = moveEvt.clientX;

  var scaleLineWidth = scaleLineElement.offsetWidth;
  var scalePinCoordsX = scalePin.offsetLeft - shiftX;

  if (scalePinCoordsX >= 0 && scalePinCoordsX <= scaleLineWidth) {
    var valuePersent = scalePinCoordsX / scaleLineWidth * 100;
    scalePin.style.left = valuePersent + '%';
    scaleLevel.style.width = valuePersent + '%';

    var filterStyle = getValueFilter(currentFilter, valuePersent);
    imagePreview.style.filter = filterStyle;
  }
};

var onMouseUp = function (upEvt) {
  upEvt.preventDefault();

  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

var onMouseDown = function (evt) {
  evt.preventDefault();

  startX = evt.clientX;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

scalePin.addEventListener('mousedown', onMouseDown);

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

})();

