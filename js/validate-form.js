import { resetSize } from './edit-image-size.js';
import { resetEffects } from './edit-image-effect.js';

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadField = document.querySelector('#upload-file');
const imgEditForm = document.querySelector('.img-upload__overlay');
const cancelUploadButton = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const imgPreiew = imgUploadForm.querySelector('.img-upload__preview img');
const imgEffectPreview = imgUploadForm.querySelectorAll('.effects__preview');

const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_NUMBER = 5;
const INVALID_HASHTAG_SYMBOLS = /[^A-Za-zА-Яа-яЁё0-9]/g;
const VALID_IMG_TYPES = ['jpg', 'jpeg', 'png'];

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const showImgEditForm = () => {
  imgEditForm.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

const isVaildImgType = (file) => {
  const fileName = file.name.toLowerCase();
  return VALID_IMG_TYPES.some((it) => fileName.endsWith(it));
};

const onFileInputChange = () => {
  const file = imgUploadField.files[0];

  if (file && isVaildImgType(file)) {
    imgPreiew.src = URL.createObjectURL(file);
    imgEffectPreview.forEach((preview) => { preview.style.backgroundImage = `url('${imgPreiew.src}')`; });
  }
  showImgEditForm();
};

const hideImgEditForm = () => {
  imgUploadForm.reset();
  resetSize();
  resetEffects();
  pristine.reset();
  imgEditForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

const isFieldOnFocus = () =>
  document.activeElement === hashtagField ||
  document.activeElement === descriptionField;

function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && !isFieldOnFocus()) {
    evt.preventDefault();
    hideImgEditForm();
  }
}

const startsWithPound = (string) => string[0] === '#';

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH &&
  string.length <= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (string) => !INVALID_HASHTAG_SYMBOLS.test(string.slice(1));

const isValidHashtag = (hashtag) =>
  startsWithPound(hashtag) &&
  hasValidLength(hashtag) &&
  hasValidSymbols(hashtag);

const isValidNumber = (hashtags) => hashtags.length <= MAX_HASHTAG_NUMBER;

const hasUniqueHashtags = (hashtags) => {
  const lowerCaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

const validateHashtags = (value) => {
  const hashtags = value
    .trim()
    .split(' ')
    .filter((hashtag) => hashtag.trim().length);
  return isValidNumber(hashtags) &&
    hasUniqueHashtags(hashtags) &&
    hashtags.every(isValidHashtag);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

pristine.addValidator(
  hashtagField,
  validateHashtags,
  'Хэштеги введены неверно'
);

const setOnFormSubmit = (cb) => {
  imgUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(imgUploadForm));
      unblockSubmitButton();
    }
  });
};

imgUploadField.addEventListener('change', onFileInputChange);

cancelUploadButton.addEventListener('click', hideImgEditForm);

export { setOnFormSubmit, hideImgEditForm };
