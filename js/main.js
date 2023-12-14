import { renderPhotos } from './get-photo-preview.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { setOnFormSubmit, hideImgEditForm } from './validate-form.js';
import { showSuccessMessage, showErrorMessage } from './show-message.js';
import { setOnFilterClick, onFilterTurn, filterPhotos } from './filter-photos.js';

const onGetDataSuccess = (data) => {
  onFilterTurn(data);
  renderPhotos(filterPhotos());
  setOnFilterClick(renderPhotos);
};

const onSendDataSuccess = () => {
  hideImgEditForm();
  showSuccessMessage();
};

const onSendDataError = () => {
  showErrorMessage();
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, onSendDataError, data);
});

getData(onGetDataSuccess, showAlert);
