const form = document.querySelector('.ad-form');
const formInteractivElements = form.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterInteractiveElements = mapFilter.querySelectorAll('fieldset, select');

const formDisable = () => {
  form.classList.add('ad-form--disabled');
  formInteractivElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

const formActive = () => {
  form.classList.remove('ad-form--disabled');
  formInteractivElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
}

const mapFiltersDisable = () => {
  mapFilter.classList.add('map__filters--disabled');
  mapFilterInteractiveElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

const mapFiltersActive = () => {
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterInteractiveElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
}

export {formDisable, mapFiltersDisable, formActive, mapFiltersActive};
