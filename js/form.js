'use strict';

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
