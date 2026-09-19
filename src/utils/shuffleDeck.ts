import type { PlayingCard } from "../types/PlayingCard";

/**
 * Stokker en kortstokk.
 * @param deck kortstokken som skal stokkes
 * @returns en stokket kopi av kortstokken
 */
export default function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  const shuffledDeck = [...deck];

  shuffledDeck.sort(() => Math.random() - 0.5);

  return shuffledDeck;
}
