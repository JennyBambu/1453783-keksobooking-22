/* global L:readonly */
import { createLodgingСard} from './popap.js';
import {formActive, mapFiltersActive} from './form.js';

const TOKYO_СOORDINATES = {
  x: 35.6894,
  y: 139.692,
};

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
    lat: TOKYO_СOORDINATES.x,
    lng: TOKYO_СOORDINATES.y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const map = L.map('map-canvas')
  .on('load', () => {
    formActive();
    mapFiltersActive();
    inputAddress.value = `${TOKYO_СOORDINATES.x}, ${TOKYO_СOORDINATES.y}`;
  })
  .setView({
    lat: TOKYO_СOORDINATES.x,
    lng: TOKYO_СOORDINATES.y,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  })
  .addTo(map);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  inputAddress.value = `${evt.target.getLatLng().lat.toFixed(ADDRESS_DIGITS_AFTER_DECIMAL)},
  ${evt.target.getLatLng().lng.toFixed(ADDRESS_DIGITS_AFTER_DECIMAL)}`;
});

const createPopupCard = (object) => {
  const popupElement = createLodgingСard(object);
  popupElement.querySelector('.popup__text--address').textContent = `Координаты: ${object.location.x}, ${object.location.y}`;

  return popupElement;
}

const generatePins =  (map, array) => {
  array.forEach((element) => {
    const icon = commonPinIcon;

    const adPin = L.marker({
      lat: element.location.x,
      lng: element.location.y,
    },
    {
      icon,
    },
    );
    adPin
      .addTo(map)
      .bindPopup(createPopupCard(element),
        {
          keepInView: true,
        },
      );
  })
}

export { map, generatePins };
