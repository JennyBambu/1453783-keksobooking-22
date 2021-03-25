import { renderPins, map} from './map.js';
import { useFormSubmitHandler } from './form-submit.js';
import { getData } from './data-server.js';
import { showAlert } from './util.js';

getData(
  (ads) => {
    renderPins(ads, map);
  }, showAlert);
useFormSubmitHandler();
