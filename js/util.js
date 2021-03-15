/**
 * Функция получения случайного числа из диапазона включительно
 * @param {number} min — минимальное значение
 * @param {number} max — максимальное значение
 * @param {number} n — количество знаков после запятой
 * @return {number|null} — случайное число
 */

const getRandomNumber = (min, max, n) => {
  if (min < 0 || max < 0) {
    return null;
  }//неверный диапазон (так как по заданию диапазон может быть только >= 0)
  if (min == max) {
    return min.toFixed(n);
  }

  let startNumber = min;
  let endNumber = max;
  //Если минимальное значение больше максимального - поменять их местами
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
  // генерация случайной длины массива
  const arrayCount = getRandomNumber(1, array.length);

  // обрезка исходный длины до высчитанной случайной длины
  let randomArray = array.slice(0, arrayCount);
  return randomArray;
}

export {getRandomNumber, getRandomElementFromArray, makeRandomArray};
