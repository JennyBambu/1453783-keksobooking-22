import {formStatus} from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const NOT_FOR_GUESTS_ROOM_VALUE = 100;
const NOT_FOR_GUESTS_CAPACITY_VALUE = 0;

const PriceMinOnNight = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
}

const form = document.querySelector('.ad-form');
const formInteractivElements = form.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterInteractiveElements = mapFilter.querySelectorAll('fieldset, select');

const formInputTitle = form.querySelector('#title');
const priceInput = form.querySelector('#price');
const roomCount = form.querySelector('#room_number');
const capacityCount = form.querySelector('#capacity');
/**
 *  Функция отключения элементов до инициализации карты
 */
const disableElementsBeforeMapLoad = () => {
  formStatus(form,'ad-form--disabled', false, formInteractivElements);
  formStatus(mapFilter,'map__filters--disabled',false, mapFilterInteractiveElements);
}

const selectType = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
/**
 *  Функция настройки зависимости цены за ночь от выбранного типа жилья
 */
selectType.addEventListener('change', (evt) => {
  inputPrice.placeholder = PriceMinOnNight[evt.target.value.toUpperCase()];
  inputPrice.setAttribute('min', PriceMinOnNight[evt.target.value.toUpperCase()]);
})
/**
 *  Синхронизация времени заезда и выезда
 */
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');

selectTimeIn.addEventListener('change', (evt) => {
  selectTimeOut.value = evt.target.value;
})

selectTimeOut.addEventListener('change', (evt) => {
  selectTimeIn.value = evt.target.value;
})

/**
 * Функция валидации поля "заголовок объявления"
 */
const titleInputValidation = () => {
  formInputTitle.addEventListener('input', () => {
    const valueLength = formInputTitle.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      formInputTitle.setCustomValidity(`Осталось ввести ещё ${MIN_TITLE_LENGTH - valueLength} символов`);
    }

    else if (valueLength > MAX_TITLE_LENGTH) {
      formInputTitle.setCustomValidity(`Максимальная длина заголовка ${MAX_TITLE_LENGTH} символов`);
    }

    else {
      formInputTitle.setCustomValidity('');
    }

    formInputTitle.reportValidity();
  });
}

/**
 * Функция валидации поля "цена за ночь"
 */
const priceInputValidation = () => {
  priceInput.addEventListener('invalid', () => {
    if (priceInput.validity.rangeUnderflow) {
      priceInput.setCustomValidity(`Минимальная цена за ночь для такого типа жилья составляет ${priceInput.getAttribute('min')} рублей`);
    }

    else if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity(`Максимальная цена за ночь не должна превышать ${priceInput.getAttribute('max')} рублей`);
    }

    else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное поле');
    }

    priceInput.addEventListener('input', function () {
      priceInput.setCustomValidity('');
    })
  });
}

/**
 * Функция валидации полей "Количество комнат" и "Количество мест"
 */

const roomAndCapacityValidation = () => {
  roomCount.addEventListener('change', () => {
    const roomNumber = parseInt(roomCount.value, 10);
    const capacityNumber = parseInt(capacityCount.value, 10);

    if (roomNumber !== NOT_FOR_GUESTS_ROOM_VALUE && capacityNumber === NOT_FOR_GUESTS_CAPACITY_VALUE) {
      roomCount.setCustomValidity('Для варианта "Не для гостей" возможен только тип комнат "100 комнат"');
    }else if (roomNumber === NOT_FOR_GUESTS_ROOM_VALUE && capacityNumber !== NOT_FOR_GUESTS_CAPACITY_VALUE) {
      roomCount.setCustomValidity('Тип "100 комнат" возможен только для варианта "Не для гостей"');
    }else if (roomNumber < capacityNumber) {
      roomCount.setCustomValidity(`Количество комнат должно быть не меньше ${capacityCount.value}`);
    } else {
      roomCount.setCustomValidity('');
    }

    roomCount.reportValidity();
  });

  capacityCount.addEventListener('change', () => {
    const roomNumber = parseInt(roomCount.value, 10);
    const capacityNumber = parseInt(capacityCount.value, 10);

    if (roomNumber == NOT_FOR_GUESTS_ROOM_VALUE && capacityNumber !== NOT_FOR_GUESTS_CAPACITY_VALUE) {
      capacityCount.setCustomValidity('Для количества "100 комнат" возможен только вариант "не для гостей"');
    } else if (roomNumber !== NOT_FOR_GUESTS_ROOM_VALUE && capacityNumber === NOT_FOR_GUESTS_CAPACITY_VALUE) {
      capacityCount.setCustomValidity('Вариант "не для гостей" возможен только для количества комнат "100 комнат"');
    } else if (roomNumber < capacityNumber) {
      capacityCount.setCustomValidity(`Количество гостей должно быть не больше ${roomCount.value}`);
    } else {
      capacityCount.setCustomValidity('');
    }

    capacityCount.reportValidity();
  });
}

/**
 * Функция валидации формы
 */
const formValidation = () => {
  titleInputValidation();
  priceInputValidation();
  roomAndCapacityValidation();
}

export {formStatus, form, formInteractivElements, mapFilter, mapFilterInteractiveElements, formValidation, disableElementsBeforeMapLoad };
