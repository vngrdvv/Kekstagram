const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const showSuccessMessage = () => {
  body.append(successMessage);
  body.addEventListener('keydown', onEscKeyDown);
  body.addEventListener('click', onBodyClick);
  successMessage
    .querySelector('.success__button')
    .addEventListener('click', hideMessage);
};

const showErrorMessage = () => {
  body.append(errorMessage);
  body.addEventListener('keydown', onEscKeyDown);
  errorMessage
    .querySelector('.error__button')
    .addEventListener('click', hideMessage);
};

function hideMessage() {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  body.addEventListener('keydown', onEscKeyDown);
  body.addEventListener('click', onBodyClick);
}

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
    hideMessage();
  }
}

function onBodyClick(evt) {
  if (evt.target.closest('.success-inner') || evt.target.closest('.error-inner')) {
    return;
  }
  hideMessage();
}

export { showSuccessMessage, showErrorMessage };
