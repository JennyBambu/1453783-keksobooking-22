const LodgingTypes = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
}

/**
* Функция создания DOM-элемента тестовой карточки объявления из объекта
*@param {object} card — объект тестовой карточки объявления жилья
*@param {object} lodgingElement— DOM-элемент тестовой карточки объявления жилья
*/
const createLodgingСard = ({offer, avatar, location}) => {
  const lodgingСard = document.querySelector('#card').content.querySelector('.popup');
  const lodgingElement = lodgingСard.cloneNode(true);

  lodgingElement.querySelector('.popup__title').textContent = offer.title;
  lodgingElement.querySelector('.popup__text--address').textContent = `Координаты: ${location.lat}, ${location.lng}`;
  lodgingElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  lodgingElement.querySelector('.popup__type').textContent = LodgingTypes[offer.type.toUpperCase()];
  lodgingElement.querySelector('.popup__description').textContent = offer.description;
  lodgingElement.querySelector('.popup__avatar').src = avatar;
  lodgingElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей.`;
  lodgingElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;

  const cardFeatures = lodgingElement.querySelector('.popup__features');
  const cardFeature = lodgingElement.querySelector('.popup__feature');

  cardFeatures.innerHTML = '';

  offer.features.forEach((feature) => {
    const newFeature = cardFeature.cloneNode(true);
    newFeature.className = (`popup__feature popup__feature--${feature}`);
    cardFeatures.appendChild(newFeature);
  });


  const cardPhotos = lodgingElement.querySelector('.popup__photos');

  if (offer.photos.length === 0) {
    cardPhotos.remove();
  }
  else {
    const cardPhoto = lodgingElement .querySelector('.popup__photo');
    cardPhoto.src = offer.photos[0];

    if (offer.photos.length > 1) {
      for (let i = 1; i < offer.photos.length; i++) {
        const nextCardPhoto = cardPhoto.cloneNode(true);
        nextCardPhoto.src = offer.photos[i];
        cardPhotos.appendChild(nextCardPhoto);
      }
    }
  }
  return lodgingElement;
}

export {createLodgingСard};
