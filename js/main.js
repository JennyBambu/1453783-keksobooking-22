/**
 * Функция получения случайного числа из диапазона включительно
 * @param {number} min — минимальное значение
 * @param {number} max — максимальное значение
 * @param {number} n — количество знаков после запятой
 * @return {number|null} — случайное число
 */

const randomnumber = (min, max, n) => {
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

const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const CHECKING_OUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']

const CARDS_COUNT = 10;

/**
 * Функция получения случайного элемента из массива строк
 * @param {array} array — исходный массив строк
 * @return {string} — случайная строка
 */
const getRandomElementFromArray = (array) => {
  return array[randomnumber(0, array.length - 1)];
}

/**
 * Функция получения массива случайной длины из массива строк
 * @param {array} array — исходный массив строк
 * @param {number} arrayCount — длина случайного массива
 * @return {array} — полученный массив случайной длины
 */
const makeRandomArray = (array) => {
  // генерация случайной длины массива
  const arrayCount = randomnumber(1, array.length);

  // обрезка исходный длины до высчитанной случайной длины
  let randomArray = array.slice(0, arrayCount);
  return randomArray;
}

/**
 * Функция генерации карточки объявления
 * @return {object} — карточка объявления
 */
const createCard = () => {
  let xRandomValue = randomnumber(35.65000, 35.70000, 5);
  let yRandomValue = randomnumber(139.70000, 139.80000, 5);
  return {
    avatar: `img/avatars/user0${randomnumber(0, 8)}.png`,
    offer: {
      title: 'Отличный вариант!',
      address: `${xRandomValue}, ${yRandomValue}`,
      price: randomnumber(200, 2000),
      type: getRandomElementFromArray(TYPE),
      rooms: randomnumber(1, 10),
      guests: randomnumber(1, 20),
      checkin: getRandomElementFromArray(CHECKING_OUT),
      checkout: getRandomElementFromArray(CHECKING_OUT),
      features: makeRandomArray(FEATURES),
      description: 'Комфортное жильё',
      photos: makeRandomArray(PHOTOS),
    },
    location: {
      x: xRandomValue,
      y: yRandomValue,
    },
  }
}
/**
 * Функция генерации тестовых данных
 * @param {number} cardsCount — количество карточек в массиве
 * @return {array} — тестовый массив карточек объявлений
 */
const makeCards = () => {
  const cards = new Array(CARDS_COUNT).fill(null).map(() => createCard());
  return cards;
}

makeCards();
