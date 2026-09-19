import type { PlayingCard } from "../types/PlayingCard";
import type { PokerHand } from "../types/PokerHand";

const CardValue = [
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
 * Tar imot fem kort og returnerer den sterkeste pokerhånden.
 * Kaster en feil dersom antall kort ikke er fem.
 */
export default function checkPokerHand(cards: PlayingCard[]): PokerHand {
  if (cards.length !== 5) {
    throw new Error("En pokerhånd må inneholde fem kort.");
  }

  // Teller hvor mange ganger hver kortverdi forekommer.
  const counts: Record<string, number> = {};

  for (const card of cards) {
    counts[card.value] = (counts[card.value] ?? 0) + 1;
  }

  const amounts = Object.values(counts);
  const pairs = amounts.filter((amount) => amount === 2).length;

  const isFlush = cards.every((card) => card.suit === cards[0].suit);

  const positions = cards
    .map((card) => CardValue.indexOf(card.value))
    .sort((a, b) => a - b);

  // Ess kan også brukes som laveste i A-2-3-4-5.
  const isLowAceStraight = positions.join(",") === "0,1,2,3,12";

  const isStraight =
    isLowAceStraight ||
    positions.every((position, index) => position === positions[0] + index);

  if (isFlush && isStraight) {
    return positions[0] === 8 ? "Royal Flush" : "Straight Flush";
  }

  if (amounts.includes(4)) return "Fire like";
  if (amounts.includes(3) && pairs === 1) return "Fullt hus";
  if (isFlush) return "Flush";
  if (isStraight) return "Straight";
  if (amounts.includes(3)) return "Tre like";
  if (pairs === 2) return "To par";
  if (pairs === 1) return "Par";

  return "Høyt kort";
}
