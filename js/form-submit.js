import { sendData, getData } from './data-server.js';
import { isEscEvent, showAlert} from './util.js';
import { resetMap, deleteAdvertisementMarkers, renderPins} from './map.js';

const MESSAGE_POSITION_Z_INDEX = 1000;
const form = document.querySelector('.ad-form');
const resetButton = form.querySelector('.ad-form__reset');
/**
 * Функция показа сообщения об ошибке отправки формы
 */
const showErrorMessageAfterFormSubmit = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorMessageModel = errorTemplate.querySelector('.error');
  const errorMessage = errorMessageModel.cloneNode(true);
  errorMessage.style.zIndex = MESSAGE_POSITION_Z_INDEX;
  document.querySelector('main').appendChild(errorMessage);

  closeMessage(errorMessage);
}
/**
 * Функция очистки полей ввода, сброса фильтров (после успешной отправки формы или нажатия на кнопку "Очистить форму")
 */
const clearFormAfterResetOrSubmit = () => {
  form.reset();
  resetMap();
  deleteAdvertisementMarkers();
  document.querySelector('.map__filters').reset();
  getData(
    (ads) => {
      renderPins(ads);
    }, showAlert);
}
/**
  * Функция закрытия сообщения об отправке формы
  * @param {object} message — DOM-элемент сообщения об отправке формы
  */
const closeMessage = (message) => {
  const onKeydown = ('keydown', (evt) => {
    if (isEscEvent(evt)) {
      message.remove();
      document.removeEventListener('keydown', onKeydown);
    }
  })

  const onClick = ('click', () => {
    message.remove();
    document.removeEventListener('click', onClick);
  })

  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeydown);
}
/**
 * Функция показа сообщения об успешной отправке формы и последующей очистке полей ввода
 */
const showSuccessMessageAfterFormSubmit = () => {
  const successTemplate = document.querySelector('#success').content;
  const successMessageModel = successTemplate.querySelector('.success');
  const successMessage = successMessageModel.cloneNode(true);
  form.reset();
  successMessage.style.zIndex = MESSAGE_POSITION_Z_INDEX;
  document.querySelector('main').appendChild(successMessage);

  closeMessage(successMessage);
  clearFormAfterResetOrSubmit(form);
}
/**
 * Функция отправки на сервер введенных пользователем данных после отправки формы
 */
const useFormSubmitHandler = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      showSuccessMessageAfterFormSubmit,
      showErrorMessageAfterFormSubmit,
      new FormData(evt.target),
    )
  });
};

/**
 * Добавление события на кнопку 'Очистить форму'
 */
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearFormAfterResetOrSubmit();
});

export { useFormSubmitHandler };

