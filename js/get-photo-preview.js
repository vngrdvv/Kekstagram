import { getFullPhoto } from './get-full-photo.js';

const photosContainer = document.querySelector('.pictures');
const templatePhotoPreview = document.querySelector('#picture').content.querySelector('.picture');

const generatePhotoElement = (data) => {
  const { url, description, likes, comments } = data;
  const newPhoto = templatePhotoPreview.cloneNode(true);

  newPhoto.querySelector('.picture__img').src = url;
  newPhoto.querySelector('.picture__img').alt = description;
  newPhoto.querySelector('.picture__likes').textContent = likes;
  newPhoto.querySelector('.picture__comments').textContent = comments.length;

  newPhoto.addEventListener('click', () => { getFullPhoto(data); });
  return newPhoto;
};

const renderPhotos = (photos) => {
  photosContainer.querySelectorAll('.picture').forEach((photo) => photo.remove());
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const photoElement = generatePhotoElement(photo);
    fragment.append(photoElement);
  });
  photosContainer.append(fragment);
};

export { renderPhotos };
