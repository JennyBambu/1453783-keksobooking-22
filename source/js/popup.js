const LodgingTypes = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
}
/**
* Функция проверки DOM-элемента тестовой карточки объявления из объекта
*@param {object} element — элемент объекта карточки объявления жилья
*@return {Boolean} — true, если длина элемента равна нулю или отсутствует атрибут src, false - если это не так
*/
const isEmptyElement = (element) => {
  return element.length === 0 || element.src === null;
}
/**
* Функция создания DOM-элемента карточки объявления из объекта
*@param {object} card — объект карточки объявления жилья
*@param {object} lodgingElement— DOM-элемент карточки объявления жилья
*/
const createLodgingCard = ({offer, author, location}) => {
  const lodgingCard = document.querySelector('#card').content.querySelector('.popup');
  const lodgingElement = lodgingCard.cloneNode(true);

  lodgingElement.querySelector('.popup__text--address').textContent = `Координаты: ${location.lat}, ${location.lng}`;
  lodgingElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  lodgingElement.querySelector('.popup__type').textContent = LodgingTypes[offer.type.toUpperCase()];
  lodgingElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей.`;
  lodgingElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;

  const cardAvatar = lodgingElement.querySelector('.popup__avatar');

  if (isEmptyElement(cardAvatar)) {
    cardAvatar.remove();
  }
  else {
    cardAvatar.src = author.avatar;
  }

  const cardTitle = lodgingElement.querySelector('.popup__title');

  if (isEmptyElement(cardTitle)) {
    cardTitle.remove();
  }
  else {
    cardTitle.textContent = offer.title;
  }

  const cardDescription = lodgingElement.querySelector('.popup__description');

  if (isEmptyElement(cardDescription)) {
    cardDescription.remove();
  }
  else {
    cardDescription.textContent = offer.description;
  }

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
  } else {
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

export {createLodgingCard};
