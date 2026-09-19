import type { PlayingCard } from "../types/PlayingCard";
import type { PokerHand } from "../types/PokerHand";

/**
 * Sjekker om hånden inneholder et par.
 * @param cards kortene som skal sjekkes
 * @returns true hvis hånden inneholder et par
 */
function hasPair(cards: PlayingCard[]) {
  return cards.some((card, index) =>
    cards.some(
      (otherCard, otherIndex) =>
        index !== otherIndex && card.value === otherCard.value,
    ),
  );
}

/**
 * Sjekker om hånden inneholder to par.
 * @param cards kortene som skal sjekkes
 * @returns true hvis hånden inneholder to par
 */
function hasTwoPairs(cards: PlayingCard[]) {
  const pairValues: string[] = [];

  cards.forEach((card) => {
    const matchingCards = cards.filter(
      (otherCard) => otherCard.value === card.value,
    );

    if (matchingCards.length === 2 && !pairValues.includes(card.value)) {
      pairValues.push(card.value);
    }
  });

  return pairValues.length === 2;
}

/**
 * Sjekker om hånden inneholder tre kort med samme verdi.
 * @param cards kortene som skal sjekkes
 * @returns true hvis hånden inneholder tre like
 */
function hasThreeOfAKind(cards: PlayingCard[]) {
  return cards.some((card) => {
    const matchingCards = cards.filter(
      (otherCard) => otherCard.value === card.value,
    );

    return matchingCards.length === 3;
  });
}

/**
 * Sjekker om hånden inneholder fire kort med samme verdi.
 * @param cards kortene som skal sjekkes
 * @returns true hvis hånden inneholder fire like
 */
function hasFourOfAKind(cards: PlayingCard[]) {
  return cards.some((card) => {
    const matchingCards = cards.filter(
      (otherCard) => otherCard.value === card.value,
    );

    return matchingCards.length === 4;
  });
}

/**
 * Sjekker om alle kortene har samme sort.
 * @param cards kortene som skal sjekkes
 * @returns true hvis hånden er en flush
 */
function hasFlush(cards: PlayingCard[]) {
  return cards.every((card) => card.suit === cards[0].suit);
}

/**
 * Sjekker om hånden inneholder tre like og et par.
 * @param cards kortene som skal sjekkes
 * @returns true hvis hånden er fullt hus
 */
function hasFullHouse(cards: PlayingCard[]) {
  const amounts: number[] = [];

  cards.forEach((card) => {
    const matchingCards = cards.filter(
      (otherCard) => otherCard.value === card.value,
    );

    if (!amounts.includes(matchingCards.length)) {
      amounts.push(matchingCards.length);
    }
  });

  return amounts.includes(3) && amounts.includes(2);
}
// Kortverdiene i rekkefølge, brukt for å sjekke straight
const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

/**
 * Sjekker om kortene har fem verdier i rekkefølge.
 * @param cards kortene som skal sjekkes
 * @returns true hvis hånden er en straight
 */
function hasStraight(cards: PlayingCard[]) {
  const positions = cards.map((card) => cardValues.indexOf(card.value));

  positions.sort((a, b) => a - b);

  const isLowAceStraight =
    positions.includes(12) &&
    positions.includes(0) &&
    positions.includes(1) &&
    positions.includes(2) &&
    positions.includes(3);

  if (isLowAceStraight) {
    return true;
  }

  return positions.every(
    (position, index) => index === 0 || position === positions[index - 1] + 1,
  );
}

/**
 * Sjekker om hånden er både straight og flush.
 * @param cards kortene som skal sjekkes
 * @returns true hvis hånden er en straight flush
 */
function hasStraightFlush(cards: PlayingCard[]) {
  return hasStraight(cards) && hasFlush(cards);
}

/**
 * Sjekker om hånden er en royal flush.
 * @param cards kortene som skal sjekkes
 * @returns true hvis hånden er en royal flush
 */
function hasRoyalFlush(cards: PlayingCard[]) {
  const royalValues = ["10", "J", "Q", "K", "A"];

  return (
    hasStraightFlush(cards) &&
    cards.every((card) => royalValues.includes(card.value))
  );
}

/**
 * Sjekker hvilken pokerhånd kortene utgjør.
 * @param cards kortene som skal sjekkes
 * @returns navnet på pokerhånden
 */
export default function checkPokerHand(cards: PlayingCard[]): PokerHand {
  if (hasRoyalFlush(cards)) {
    return "Royal Flush";
  }

  if (hasStraightFlush(cards)) {
    return "Straight Flush";
  }

  if (hasFourOfAKind(cards)) {
    return "Fire like";
  }

  if (hasFullHouse(cards)) {
    return "Fullt hus";
  }

  if (hasFlush(cards)) {
    return "Flush";
  }

  if (hasStraight(cards)) {
    return "Straight";
  }

  if (hasThreeOfAKind(cards)) {
    return "Tre like";
  }

  if (hasTwoPairs(cards)) {
    return "To par";
  }

  if (hasPair(cards)) {
    return "Par";
  }

  return "Høyt kort";
}
