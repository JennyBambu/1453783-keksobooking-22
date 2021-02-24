/**
 * Функция получения случайного числа из диапазона включительно
 * @param {number} min — минимальное значение
 * @param {number} max — максимальное значение
 * @param {number} n — количество знаков после запятой
 * @return {number|null} — случайное число
 */

const RANDOMNUMBER = (min, max, n) => {
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

let cardsCount = 10;

/**
 * Функция получения случайного элемента из массива строк
 * @param {array} array — исходный массив строк
 * @return {string} — случайная строка
 */
const GET_RANDOM_ELEMENT_FROM_ARRAY = (array) => {
  return array[RANDOMNUMBER(0, array.length - 1)];
}

/**
 * Функция получения массива случайной длины из массива строк
 * @param {array} array — исходный массив строк
 * @param {number} arrayCount — длина случайного массива
 * @return {array} — полученный массив случайной длины
 */
const MAKE_RANDOM_ARRAY = (array) => {
  // генерация случайной длины массива
  const arrayCount = RANDOMNUMBER(1, array.length);

  // обрезка исходный длины до высчитанной случайной длины
  let randomArray = array.slice(0, arrayCount);
  return randomArray;
}

/**
 * Функция генерации карточки объявления
 * @return {object} — карточка объявления
 */
const CREATECARD = () => {
  let xRandomValue = RANDOMNUMBER(35.65000, 35.70000, 5);
  let yRandomValue = RANDOMNUMBER(139.70000, 139.80000, 5);
  return {
    avatar: `img/avatars/user0${RANDOMNUMBER(0, 8)}.png`,
    offer: {
      title: 'Отличный вариант!',
      address: `${xRandomValue}, ${yRandomValue}`,
      price: RANDOMNUMBER(200, 2000),
      type: GET_RANDOM_ELEMENT_FROM_ARRAY(TYPE),
      rooms: RANDOMNUMBER(1, 10),
      guests: RANDOMNUMBER(1, 20),
      checkin: GET_RANDOM_ELEMENT_FROM_ARRAY(CHECKING_OUT),
      checkout: GET_RANDOM_ELEMENT_FROM_ARRAY(CHECKING_OUT),
      features: MAKE_RANDOM_ARRAY(FEATURES),
      description: 'Комфортное жильё',
      photos: MAKE_RANDOM_ARRAY(PHOTOS),
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
const MAKECARDS = ()=> {
  const CARDS = new Array(cardsCount).fill(null).map(() => CREATECARD());
  return CARDS;
}

MAKECARDS(cardsCount);
