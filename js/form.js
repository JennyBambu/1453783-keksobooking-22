const form = document.querySelector('.ad-form');
const formInteractivElements = form.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterInteractiveElements = mapFilter.querySelectorAll('fieldset, select');


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

export {formStatus, form, formInteractivElements, mapFilter, mapFilterInteractiveElements};
