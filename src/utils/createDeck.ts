import type { PlayingCard, Suit, CardValue } from "../types/PlayingCard";

// Kortsortene og verdiene som brukes til å lage kortstokken
const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
const values: CardValue[] = [
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
 * Lager og returnerer en komplett kortstokk med 52 kort.
 */
export default function createDeck(): PlayingCard[] {
  return suits.flatMap((suit) => values.map((value) => ({ suit, value })));
}
