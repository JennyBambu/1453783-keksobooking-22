/* global _:readonly */
import {deleteAdvertisementMarkers} from './map.js';
import {renderPins} from './map.js';

const ANY = 'any';
const PRICE_LOW = 10000;
const PRICE_HIGH = 50000;
const PRICE_LOW_VALUE = 'low';
const PRICE_MIDDLE_VALUE = 'middle';
const PRICE_HIGH_VALUE = 'high';
const PAUSE_BEFORE_RENDER = 500;

const filter = document.querySelector('.map__filters');
const houseType = filter.querySelector('#housing-type');
const price = filter.querySelector('#housing-price');
const houseRooms = filter.querySelector('#housing-rooms');
const houseGuests = filter.querySelector('#housing-guests');
/**
 * Фильтрация и рендеринг на карте массива объявлений
 * @param {array} advertisements  - массив из объявлений с сервера для последующей фильтрации
 * @return {array} - новый массив с отфильтрованными объявлениями
 */
const advertisementFilter = (advertisements) => {
  const checkedFeatures = filter.querySelectorAll('input[name="features"]:checked');
  let newFilterAdvertisements = [];
  deleteAdvertisementMarkers();

  advertisements.forEach((advertisement) => {
    let isTypeSuit = true;
    let isPriceSuit = true;
    let isRoomsSuit = true;
    let isGuestsSuit = true;
    let isFeaturesSuit = true;

    if (houseType.value !== ANY) {
      isTypeSuit = advertisement.offer.type === houseType.value;
    }
    if (price.value !== ANY) {
      let price;
      if (advertisement.offer.price < PRICE_LOW) {
        price = PRICE_LOW_VALUE;
      } else if (advertisement.offer.price > PRICE_HIGH) {
        price = PRICE_HIGH_VALUE;
      } else {
        price = PRICE_MIDDLE_VALUE;
      }

      isPriceSuit = price === price.value;
    }
    if (houseRooms.value !== ANY) {
      isRoomsSuit = advertisement.offer.rooms.toString() === houseRooms.value;
    }
    if (houseGuests.value !== ANY) {
      isGuestsSuit = advertisement.offer.guests.toString() === houseGuests.value;
    }
    if (checkedFeatures.length) {
      checkedFeatures.forEach((feature) => {
        if (advertisement.offer.features.indexOf(feature.value) === -1) {
          isFeaturesSuit = false;
        }
      });
    }
    if (isTypeSuit && isRoomsSuit && isGuestsSuit && isPriceSuit && isFeaturesSuit) {
      newFilterAdvertisements.push(advertisement);
    }
  });
  return newFilterAdvertisements;
}
/**
 * Обработчик событий изменения пользователем фильтра
 * @param {array} advertisements - массив объявлений для фильтрации
 */
const changeFilter = (advertisements) => {
  filter.addEventListener('change', _.debounce(
    () => {
      deleteAdvertisementMarkers();
      renderPins(advertisements);
    },
    PAUSE_BEFORE_RENDER,
  ));
}

export {advertisementFilter, changeFilter};
