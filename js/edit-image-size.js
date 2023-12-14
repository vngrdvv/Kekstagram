const reduceImgButton = document.querySelector('.scale__control--smaller');
const enlargeImgButton = document.querySelector('.scale__control--bigger');
const imgSizeInput = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const STEP = 25;
const MIN_SIZE = 25;
const MAX_SIZE = 100;
const DEFAULT_SIZE = 100;

const changeImgSize = (value = DEFAULT_SIZE) => {
  imgPreview.style.transform = `scale(${value / 100})`;
  imgSizeInput.value = `${value}%`;
};

const reduceImg = () => {
  const currentValue = parseInt(imgSizeInput.value, 10);
  let newValue = currentValue - STEP;
  if (newValue <= MIN_SIZE) {
    newValue = MIN_SIZE;
  }
  changeImgSize(newValue);
};

const enlargeImg = () => {
  const currentValue = parseInt(imgSizeInput.value, 10);
  let newValue = currentValue + STEP;
  if (newValue >= MAX_SIZE) {
    newValue = MAX_SIZE;
  }
  changeImgSize(newValue);
};

const resetSize = () => changeImgSize();

reduceImgButton.addEventListener('click', reduceImg);
enlargeImgButton.addEventListener('click', enlargeImg);

export { resetSize };
