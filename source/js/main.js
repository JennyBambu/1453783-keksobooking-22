import {initializeMap, renderPins } from './map.js';
import { activateFormDataPostOnSubmit } from './form-submit.js';
import { getData } from './data-server.js';
import { showAlert } from './util.js';
import { formValidation, disableElementsBeforeMapLoad } from './form.js';
import { changeFilter} from './filter.js';
import { pickAvatar, pickImage } from './image-preview.js';

disableElementsBeforeMapLoad();
initializeMap();
getData(
  (advertisements) => {
    renderPins(advertisements);
    changeFilter(advertisements);
  }, showAlert);
pickAvatar();
pickImage();
formValidation();
activateFormDataPostOnSubmit();


