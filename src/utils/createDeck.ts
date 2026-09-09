import type { PlayingCard, Suit, CardValue } from "../types/PlayingCard";

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

export default function createDeck(): PlayingCard[] {
  const deck: PlayingCard[] = [];

  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({
        suit: suit,
        value: value,
      });
    });
  });

  return deck;
}
