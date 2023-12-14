import { debounce } from './util.js';

const filterContainer = document.querySelector('.img-filters');

const filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const MAX_PHOTOS_SHOWN = 10;
let currentFilter = '';
let photos = [];

const onFilterTurn = (loadedPhotos) => {
  filterContainer.classList.remove('img-filters--inactive');
  photos = [...loadedPhotos];
  currentFilter = filter.DEFAULT;
};

const sortRandom = () => Math.random() - 0.5;

const sortMostDiscussed = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const filterPhotos = () => {
  switch (currentFilter) {
    case filter.RANDOM:
      return [...photos].sort(sortRandom).slice(0, MAX_PHOTOS_SHOWN);
    case filter.DISCUSSED:
      return [...photos].sort(sortMostDiscussed);
    default:
      return [...photos];
  }
};

const setOnFilterClick = (cb) => {
  const debounceCallback = debounce(cb);

  filterContainer.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    if (evt.target.id === currentFilter) {
      return;
    }

    filterContainer
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    debounceCallback(filterPhotos());
  });
};

export { setOnFilterClick, onFilterTurn, filterPhotos };
