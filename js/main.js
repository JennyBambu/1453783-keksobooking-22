import {makeCards, CARDS_COUNT}  from './make-cards.js';
import {generatePins, map } from './map.js';

const newCardsData = makeCards(CARDS_COUNT);

generatePins(map, newCardsData);
