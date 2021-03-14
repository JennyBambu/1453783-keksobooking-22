import {makeCards, CARDS_COUNT}  from './make-cards.js';
import {createLodgingСard}  from './popap.js';

const newCardsData = makeCards(CARDS_COUNT);
const map = document.querySelector('#map-canvas');
const currentCard = createLodgingСard(newCardsData[0]);
map.appendChild(currentCard);
