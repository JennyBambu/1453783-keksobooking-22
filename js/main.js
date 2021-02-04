//Вариант решение о генерации случайного числа взяла с https://learn.javascript.ru/task/random-int-min-max
/*
Функция, возвращающая случайное число из переданного диапазона включительно
*/
const randomNumber = function (min, max, n){
  if (min < 0 || max < 0) return null; //неверный диапазон (так как по заданию диапазон может быть только >= 0)
  if (min == max) return min.toFixed(n);
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

randomNumber(1,7); //Если нужно целое число - то n равно 0
randomNumber(1,7,4);
