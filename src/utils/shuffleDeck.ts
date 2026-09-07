import type { PlayingCard } from "../types/PlayingCard";

export default function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  const shuffleDeck = [...deck];

  shuffleDeck.sort(() => Math.random() - 0.5);

  return shuffleDeck;
}
