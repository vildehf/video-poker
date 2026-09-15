import type { PlayingCard } from "../types/PlayingCard";
import type { PokerHand } from "../types/PokerHand";

function hasPair(cards: PlayingCard[]) {
  return cards.some((card, index) =>
    cards.some(
      (otherCard, otherIndex) =>
        index !== otherIndex && card.value === otherCard.value,
    ),
  );
}

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

function hasThreeOfAKind(cards: PlayingCard[]) {
  return cards.some((card) => {
    const matchingCards = cards.filter(
      (otherCard) => otherCard.value === card.value,
    );

    return matchingCards.length === 3;
  });
}

/**
 * Sjekker hvilken pokerhånd kortene utgjør.
 * @param cards kortene som skal sjekkes
 * @returns navnet på pokerhånden
 */
export default function checkPokerHand(cards: PlayingCard[]): PokerHand {
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
