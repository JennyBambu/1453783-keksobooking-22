const form = document.querySelector('.ad-form');
const formInteractivElements = form.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterInteractiveElements = mapFilter.querySelectorAll('fieldset, select');
const PriceMinOnNight = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
}

const formStatus = (that, thatclass, active, collection) => {
  if(active) {
    that.classList.add(thatclass);
  } else {
    that.classList.remove(thatclass);
  }

  collection.forEach((element) => {
    if(active) {
      element.setAttribute('disabled', 'disabled');
    } else {
      element.removeAttribute('disabled', 'disabled');
    }});
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

export {formStatus, form, formInteractivElements, mapFilter, mapFilterInteractiveElements};
