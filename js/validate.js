'use strict';

var checkDublicateHashtags = function (words) {
  var lowerCaseWords = words.map(function (element) {
    return element.toLowerCase();
  });
  return lowerCaseWords.every(function (element) {
    return lowerCaseWords.indexOf(element) !== lowerCaseWords.lastIndexOf(element);
  });
};

var areHashtags = function (words) {
  return words.every(function (word) {
    return word[0] === '#' && word.lastIndexOf('#') === 0 && word.length > 2;
  });
};

var checkHashtagsNumber = function (words) {
  return words.length < 5;
};

var checkHashtagLength = function (words) {
  return words.every(function (word) {
    return word.length < 20;
  });
};

var hashtagInput = effectsContainer.querySelector('.text__hashtags');

var checkHashtags = function (string) {
  var element = hashtagInput; // input
  var words = string.split(/ +/);
  if (!areHashtags(words)) {
    element.setCustomValidity('Строка содержит невалидный хештег');
  } else if (!checkHashtagsNumber(words)) {
    element.setCustomValidity('Хештегов не должно быть больше 5');
  } else if (!checkHashtagLength(words)) {
    element.setCustomValidity('Длина хештега больше 20');
  } else if (checkDublicateHashtags(words)) {
    element.setCustomValidity('Присутствуют повторяющиеся хештеги');
  } else {
    element.setCustomValidity('');
  }
};

hashtagInput.addEventListener('blur', function () {
  checkHashtags(hashtagInput.value);
});


var checkCommentLength = function (string) {
  return string.length < 140;
};

var commentInput = effectsContainer.querySelector('.text__description');
var checkCommentField = function (string) {
  if (!checkCommentLength(string)) {
    commentInput.setCustomValidity('Длина комментария не должна привышать 140 символов');
  } else {
    commentInput.setCustomValidity(' ');
  }
};

commentInput.addEventListener('blur', function () {
  checkCommentField(commentInput.value);
});
