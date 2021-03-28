/* global L:readonly */
import { createLodgingСard} from './popup.js';
import { formStatus, form, formInteractivElements, mapFilter, mapFilterInteractiveElements } from './form.js';
import { TokyoСoordinate } from './util.js';
import { advertisementFilter } from './filter.js';

const MAP_ZOOM = 10;
const ADDRESS_DIGITS_AFTER_DECIMAL = 5;
const LIMIT_PINS_ON_MAP = 10;
const inputAddress = document.querySelector('#address');

let map = L.map('map-canvas');
let mainPinMarker;
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [50, 82],
  iconAnchor: [12, 41],
});

mainPinMarker = L.marker(
  {
    lat: TokyoСoordinate.X,
    lng: TokyoСoordinate.Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const initializeMap = () => {
  map
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
}

const commonPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
/**
  * Функция создания на карте пинов объявлениЙ, при клике на которые открывается всплывающая карточка отдельного объявления
  * @param {array} advertisements —  загруженный массив объектов объявлений для создания пинов на карте
  */
const renderPins = (advertisements) => {
  advertisementFilter(advertisements)
    .slice(0, LIMIT_PINS_ON_MAP)
    .forEach((ad) => {
      const icon = commonPinIcon;
      const adPin = L.marker({
        lat: ad.location.lat,
        lng: ad.location.lng,
      },
      {
        icon,
      },
      );
      adPin._id = 'advertisement';
      adPin
        .addTo(map)
        .bindPopup(createLodgingСard(ad),
          {
            keepInView: true,
          },
        );
    })
}

/**
  * Функция возвращения карты в исходное состояние
  * @param {number} x — координата широты
  * @param {number} y — координата долготы
  */
const resetMap = (x = TokyoСoordinate.X, y = TokyoСoordinate.Y) => {
  map.setView({
    lat: x,
    lng: y,
  }, MAP_ZOOM);

  mainPinMarker.setLatLng([x, y]);

  inputAddress.value = `${x}, ${y}`;
}

/**
 * Функция удаления всех маркеров объявлений с карты, кроме главного маркера
 */
const deleteAdvertisementMarkers = () => {
  map.eachLayer((layer) => {
    if (layer._id === 'advertisement') {
      map.removeLayer(layer);
    }
  });
}

export { map, renderPins, initializeMap, resetMap, deleteAdvertisementMarkers};
