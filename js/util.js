/**
 * Функция получения случайного числа из диапазона включительно
 * @param {number} min — минимальное значение
 * @param {number} max — максимальное значение
 * @param {number} n — количество знаков после запятой
 * @return {number|null} — случайное число
 */
const ALERT_SHOW_TIME = 5000;
const TokyoСoordinate = {
  X: 35.6894,
  Y: 139.692,
};

const getRandomNumber = (min, max, n) => {
  if (min < 0 || max < 0) {
    return null;
  }
  if (min === max) {
    return min.toFixed(n);
  }

  let startNumber = min;
  let endNumber = max;
  if (startNumber > endNumber) {
    startNumber = max;
    endNumber = min;
  }

  const rand = startNumber + Math.random() * (endNumber + 1 - startNumber);
  return +rand.toFixed(n);
}
/**
 * Функция получения случайного элемента из массива строк
 * @param {array} array — исходный массив строк
 * @return {string} — случайная строка
 */
const getRandomElementFromArray = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
}
/**
 * Функция получения массива случайной длины из массива строк
 * @param {array} array — исходный массив строк
 * @param {number} arrayCount — длина случайного массива
 * @return {array} — полученный массив случайной длины
 */
const makeRandomArray = (array) => {
  const arrayCount = getRandomNumber(1, array.length);
  let randomArray = array.slice(0, arrayCount);
  return randomArray;
}
/**
 * Функция проверки на нажатие клавиши 'Esc'
 * @return {Boolean} — true, если была нажата клавиша ESC, false - если не была нажата
 */
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
}
/**
  * Функция создания сообщения об ошибке
  * @param {string} message
  */
const showAlert = (message) => {
  const adTitle = document.querySelector('.notice__title')
  const alertContainer = document.createElement('div');
  alertContainer.style.padding = '30px';
  alertContainer.style.fontSize = '40px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.zIndex = 1000;
  alertContainer.textContent = message;

  adTitle.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const formStatus = (that, thatclass, active, collection) => {
  if(active) {
    that.classList.add(thatclass);
  } else {
    that.classList.remove(thatclass);
  }

  collection.forEach((element) => {
    if(active) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }});
}

export {getRandomNumber, getRandomElementFromArray, makeRandomArray, isEscEvent, TokyoСoordinate, showAlert, formStatus };
