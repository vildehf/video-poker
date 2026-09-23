import type { PlayingCard } from "../types/PlayingCard";

/**
 * Bytter ut kort som ikke er holdt.
 * Tar imot hånden, kortstokken og plassene til HOLD-kortene.
 * Returnerer ny hånd, gjenværende kortstokk og kastede kort,
 * eller null dersom kortstokken ikke har nok kort.
 */
export default function drawHand(
  hand: PlayingCard[],
  deck: PlayingCard[],
  heldCards: number[],
) {
  const discardedCards = hand.filter((_, index) => !heldCards.includes(index));

  if (deck.length < discardedCards.length) return null;

  let nextCardIndex = 0;

  const newHand = hand.map((card, index) =>
    heldCards.includes(index) ? card : deck[nextCardIndex++],
  );

  return {
    hand: newHand,
    deck: deck.slice(nextCardIndex),
    discardedCards,
  };
}
