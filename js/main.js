import { renderPins, map} from './map.js';
import { useFormSubmitHandler } from './form-submit.js';
import { getData } from './data-server.js';
import { showAlert } from './util.js';
import { formValidation } from './form.js';

getData(
  (ads) => {
    renderPins(ads, map);
  }, showAlert);
useFormSubmitHandler();
formValidation();
