import {initializeMap, renderPins } from './map.js';
import { useFormSubmitHandler } from './form-submit.js';
import { getData } from './data-server.js';
import { showAlert } from './util.js';
import { formValidation, disableElementsBeforeMapLoad } from './form.js';
import { changeFilter} from './filter.js';

disableElementsBeforeMapLoad();
initializeMap();
getData(
  (ads) => {
    renderPins(ads);
    changeFilter(ads);
  }, showAlert);
formValidation();
useFormSubmitHandler();

