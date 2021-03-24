import {makeCards, CARDS_COUNT}  from './make-cards.js';
import {renderPins, map } from './map.js';

const newCardsData = makeCards(CARDS_COUNT);

renderPins(map, newCardsData);
