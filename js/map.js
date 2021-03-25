/* global L:readonly */
import { createLodgingСard} from './popup.js';
import { formStatus, form, formInteractivElements, mapFilter, mapFilterInteractiveElements } from './form.js';
import { TokyoСoordinate } from './util.js';

const MAP_ZOOM = 10;
const ADDRESS_DIGITS_AFTER_DECIMAL = 5;
const inputAddress = document.querySelector('#address');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [50, 82],
  iconAnchor: [12, 41],
});

const commonPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const mainPinMarker = L.marker(
  {
    lat: TokyoСoordinate.X,
    lng: TokyoСoordinate.Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const map = L.map('map-canvas')
  .on('load', () => {
    formStatus(form,'ad-form--disabled', false, formInteractivElements);
    formStatus(mapFilter,'map__filters--disabled',false, mapFilterInteractiveElements);
    inputAddress.value = `${TokyoСoordinate.X}, ${TokyoСoordinate.Y}`;
  })
  .setView({
    lat: TokyoСoordinate.X,
    lng: TokyoСoordinate.Y,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  })
  .addTo(map);

mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  inputAddress.value = `${evt.target.getLatLng().lat.toFixed(ADDRESS_DIGITS_AFTER_DECIMAL)},
  ${evt.target.getLatLng().lng.toFixed(ADDRESS_DIGITS_AFTER_DECIMAL)}`;
});

/**
  * Функция создания на карте пинов объявлениЙ, при клике на которые открывается всплывающая карточка отдельного объявления
  * @param {object} map — объект, содержащий информацию об объявлении
  * @param {array} pinsdata — массив объектов объявлений для создания пинов на карте
  */
const renderPins =  (pinsdata,map) => {
  pinsdata.forEach((pin) => {
    const icon = commonPinIcon;

    const adPin = L.marker({
      lat: pin.location.lat,
      lng: pin.location.lng,
    },
    {
      icon,
    },
    );
    adPin
      .addTo(map)
      .bindPopup(createLodgingСard(pin),
        {
          keepInView: true,
        },
      );
  })
}

export { map, renderPins };
