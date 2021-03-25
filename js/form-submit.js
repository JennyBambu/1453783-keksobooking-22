import { sendData } from './data-server.js';
import { isEscEvent, TokyoСoordinate } from './util.js';
/**
 * Функция показа сообщения об ошибке отправки формы
 */
const form = document.querySelector('.ad-form');

const showErrorMessageAfterFormSubmit = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorMessageModel = errorTemplate.querySelector('.error');
  const errorMessage = errorMessageModel.cloneNode(true);

  document.querySelector('main').appendChild(errorMessage);

  closeMessage(errorMessage);
}
/**
 * Функция очистки полей ввода (после успешной отправки формы или нажатия на кнопку "Очистить форму")
 */
const clearFormAfterResetOrSubmit = (form) => {
  form.reset();
  document.querySelector('#address').value = `${TokyoСoordinate.X}, ${TokyoСoordinate.Y}`
}

/**
  * Функция закрытия сообщения об отправке формы
  * @param {object} message — DOM-элемент сообщения об отправке формы
  */
const closeMessage = (message) => {
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      message.remove();
    }
  })

  document.addEventListener('click', () => {
    message.remove();
  })
}
/**
 * Функция показа сообщения об успешной отправке формы и последующей очистке полей ввода
 */
const showSuccessMessageAfterFormSubmit = () => {
  const successTemplate = document.querySelector('#success').content;
  const successMessageModel = successTemplate.querySelector('.success');
  const successMessage = successMessageModel.cloneNode(true);

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

export { useFormSubmitHandler };

