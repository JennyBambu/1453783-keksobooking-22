/**
* Функция создания DOM-элемента тестовой карточки объявления из объекта
*@param {object} card — объект тестовой карточки объявления жилья
*@param {object} lodgingElement— DOM-элемент тестовой карточки объявления жилья
*/
const createLodgingСard = (card) => {
  const lodgingСard = document.querySelector('#card').content.querySelector('.popup');
  const lodgingElement = lodgingСard.cloneNode(true);

  lodgingElement.querySelector('.popup__title').textContent = card.offer.title;
  lodgingElement.querySelector('.popup__text--address').textContent = card.offer.address;
  lodgingElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  lodgingElement.querySelector('.popup__type').textContent = Object.values(card.offer.type);
  lodgingElement.querySelector('.popup__description').textContent = card.offer.description;
  lodgingElement.querySelector('.popup__avatar').src = card.avatar;
  lodgingElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей.`;
  lodgingElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}.`;


  if (card.offer.features.includes('wifi')) {
    lodgingElement.querySelector('.popup__feature--wifi').textContent = 'wifi';
  } else {
    lodgingElement.querySelector('.popup__feature--wifi').style.display = 'none';
  }

  if (card.offer.features.includes('dishwasher')) {
    lodgingElement.querySelector('.popup__feature--dishwasher').textContent  = 'dishwasher';
  } else {
    lodgingElement.querySelector('.popup__feature--dishwasher').style.display = 'none';
  }

  if (card.offer.features.includes('parking')) {
    lodgingElement.querySelector('.popup__feature--parking').textContent = 'parking';
  } else {
    lodgingElement.querySelector('.popup__feature--parking').style.display = 'none';
  }

  if (card.offer.features.includes('washer')) {
    lodgingElement.querySelector('.popup__feature--washer').textContent = 'washer';
  } else {
    lodgingElement.querySelector('.popup__feature--washer').style.display = 'none';
  }

  if (card.offer.features.includes('elevator')) {
    lodgingElement.querySelector('.popup__feature--elevator').textContent = 'elevator';
  } else {
    lodgingElement.querySelector('.popup__feature--elevator').style.display = 'none';
  }

  if (card.offer.features.includes('conditioner')) {
    lodgingElement.querySelector('.popup__feature--conditioner').textContent = 'conditioner';
  } else {
    lodgingElement.querySelector('.popup__feature--conditioner').style.display = 'none';
  }

  const cardPhotos = lodgingElement.querySelector('.popup__photos');

  if (card.offer.photos.length === 0) {
    cardPhotos.remove();
  }
  else {
    const cardPhoto = lodgingElement .querySelector('.popup__photo');
    cardPhoto.src = card.offer.photos[0];

    if (card.offer.photos.length > 1) {
      for (let i = 1; i < card.offer.photos.length; i++) {
        const nextCardPhoto = cardPhoto.cloneNode(true);
        nextCardPhoto.src = card.offer.photos[i];
        cardPhotos.appendChild(nextCardPhoto);
      }
    }
  }
  return lodgingElement;
}

export {createLodgingСard};
