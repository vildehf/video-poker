import type { PlayingCard } from "../types/PlayingCard";

/**
 * Tar imot en kortstokk og returnerer en stokket kopi.
 * Bruker Fisher-Yates uten å endre den opprinnelige kortstokken.
 */
export default function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
